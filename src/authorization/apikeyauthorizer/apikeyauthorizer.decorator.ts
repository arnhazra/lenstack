import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { AirlakeHistoryModel } from "src/api/apps/airlake/entities/airlake-history.entity"
import { FrostlakeAnalyticsModel } from "src/api/apps/frostlake/entities/frostlake-analytics.entity"
import { WealthnowAssetModel } from "src/api/apps/wealthnow/entities/wealthnow-asset.entity"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { prototypeABI } from "src/bin/prototypeABI"
import { envConfig } from "src/config/envConfig"
import { apiPricing, subscriptionConfig } from "src/config/subscriptionConfig"
import { otherConstants } from "src/constants/otherConstants"
import Web3 from "web3"

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
        const infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
        const web3Provider = new Web3(infuraEndpoint)
        const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, envConfig.prototypeContractAddress)

        if (subscription) {
          const currentDate = new Date()
          const expiryDate = subscription.expiresAt

          if (currentDate > expiryDate) {
            await SubscriptionModel.findOneAndDelete({ owner: subscription.owner })
          }

          const airlakeUsedTokens = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
          const frostlakeUsedTokens = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
          const wealthnowUsedTokens = await WealthnowAssetModel.find({ apiKey }).countDocuments() * apiPricing.wealthnow
          const snowlakeUsedTokens = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
          const usedTokens = airlakeUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + wealthnowUsedTokens

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