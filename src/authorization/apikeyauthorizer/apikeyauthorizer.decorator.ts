import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { AirlakeHistoryModel } from "src/api/apps/airlake/entities/airlake-history.entity"
import { DwalletTransactionModel } from "src/api/apps/dwallet/entities/dwallet.entity"
import { FrostlakeAnalyticsModel } from "src/api/apps/frostlake/entities/frostlake-analytics.entity"
import { SnowlakeTransactionModel } from "src/api/apps/snowlake/entities/snowlake.entity"
import { SwapstreamTransactionModel } from "src/api/apps/swapstream/entities/swapstream.entity"
import { WealthnowAssetModel } from "src/api/apps/wealthnow/entities/wealthnow-asset.entity"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { apiPricing, subscriptionConfig } from "src/config/subscriptionConfig"

export const ApiKeyAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const apiKeyFromParams = request.query.apiKey
    const apiKeyFromBody = request.body.apiKey
    const apiKey = apiKeyFromParams ? apiKeyFromParams : apiKeyFromBody

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
            await SubscriptionModel.findOneAndDelete({ owner: subscription.owner })
          }

          const airlakeUsedTokens = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
          const dwalletUsedTokens = await DwalletTransactionModel.find({ apiKey }).countDocuments() * apiPricing.dwallet
          const frostlakeUsedTokens = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
          const swapstreamUsedTokens = await SwapstreamTransactionModel.find({ apiKey }).countDocuments() * apiPricing.swapstream
          const snowlakeUsedTokens = await SnowlakeTransactionModel.find({ apiKey }).countDocuments() * apiPricing.snowlake
          const wealthnowUsedTokens = await WealthnowAssetModel.find({ apiKey }).countDocuments() * apiPricing.wealthnow
          const usedTokens = airlakeUsedTokens + dwalletUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + swapstreamUsedTokens + wealthnowUsedTokens

          if (usedTokens < subscriptionConfig[`${subscription.selectedPlan.toLowerCase()}SubscriptionConfig`].grantedTokens) {
            return subscription.owner.toString()
          }

          else {
            throw new ForbiddenException()
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