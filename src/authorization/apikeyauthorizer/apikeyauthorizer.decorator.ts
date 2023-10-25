import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { AirlakeHistoryModel } from "src/api/apps/airlake/entities/airlake-history.entity"
import { CruxqlDbOwnershipModel } from "src/api/apps/cruxql/entities/cruxql-dbownership.entity"
import { DwalletTransactionModel } from "src/api/apps/dwallet/entities/dwallet.entity"
import { EasenftTransactionModel } from "src/api/apps/easenft/entities/easenft.entity"
import { FrostlakeAnalyticsModel } from "src/api/apps/frostlake/entities/frostlake-analytics.entity"
import { SnowlakeTransactionModel } from "src/api/apps/snowlake/entities/snowlake.entity"
import { SwapstreamTransactionModel } from "src/api/apps/swapstream/entities/swapstream.entity"
import { VuelockSecretModel } from "src/api/apps/vuelock/entities/vuelock-secret.entity"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { apiPricing, subscriptionConfig } from "src/config/subscriptionConfig"

export const ApiKeyAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const apiKey = request.body.apiKey
    const requestedResource = String(request.originalUrl).split("/")[2]

    if (!apiKey) {
      throw new ForbiddenException()
    }

    else {
      try {
        const subscription = await SubscriptionModel.findOne({ apiKey })

        if (subscription) {
          const currentDate = new Date()
          const expiryDate = subscription.expiresAt

          if (currentDate > expiryDate) {
            await SubscriptionModel.findOneAndDelete({ apiKey })
          }

          else {
            const airlakeUsedCredits = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
            const cruxqlUsedCredits = await CruxqlDbOwnershipModel.find({ apiKey }).countDocuments() * apiPricing.cruxql
            const dwalletUsedCredits = await DwalletTransactionModel.find({ apiKey }).countDocuments() * apiPricing.dwallet
            const easeNftUsedCredits = await EasenftTransactionModel.find({ apiKey }).countDocuments() * apiPricing.easenft
            const frostlakeUsedCredits = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
            const snowlakeUsedCredits = await SnowlakeTransactionModel.find({ apiKey }).countDocuments() * apiPricing.snowlake
            const swapstreamUsedCredits = await SwapstreamTransactionModel.find({ apiKey }).countDocuments() * apiPricing.swapstream
            const vuelockUsedCredits = await VuelockSecretModel.find({ apiKey }).countDocuments() * apiPricing.vuelock
            const usedCredits = airlakeUsedCredits +
              cruxqlUsedCredits +
              dwalletUsedCredits +
              easeNftUsedCredits +
              frostlakeUsedCredits +
              snowlakeUsedCredits +
              swapstreamUsedCredits +
              vuelockUsedCredits

            const creditRequiredForCurrentRequest = apiPricing[`${requestedResource}`]

            if ((usedCredits + creditRequiredForCurrentRequest) < subscriptionConfig[`${subscription.selectedPlan.toLowerCase()}SubscriptionConfig`].grantedCredits) {
              return subscription.owner.toString()
            }

            else {
              throw new ForbiddenException()
            }
          }
        }

        else {
          throw new ForbiddenException()
        }
      }

      catch (error) {
        throw new ForbiddenException()
      }
    }
  },
)