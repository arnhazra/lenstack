import { Request, Response, NextFunction } from "express"
import { statusMessages } from "../constants/statusMessages"
import { apiPricing, subscriptionConfig } from "../../config/subscriptionConfig"
import AirlakeHistoryModel from "../app/apps/airlake/AirlakeHistoryModel"
import { MasterSubscriptionModel, ReplicaSubscriptionModel } from "../app/subscription/SubscriptionModel"
import EvolakeQueryModel from "../app/apps/evolake/EvolakeQueryModel"
import FrostlakeAnalyticsModel from "../app/apps/frostlake/FrostlakeAnalyticsModel"
import Web3 from "web3"
import { otherConstants } from "../constants/otherConstants"
import { envConfig } from "../../config/envConfig"
import { prototypeABI } from "../bin/prototypeABI"
import WealthnowAssetModel from "../app/apps/wealthnow/WealthnowAssetModel"

async function apiKeyAuthorizer(req: Request, res: Response, next: NextFunction) {
    const apiKeyFromParams = req.params.apiKey
    const apiKeyFromBody = req.body.apiKey

    const apiKey = apiKeyFromParams ? apiKeyFromParams : apiKeyFromBody

    if (!apiKey) {
        return res.status(403).json({ msg: statusMessages.subscribeToContinue })
    }

    else {
        try {
            const subscription = await MasterSubscriptionModel.findOne({ apiKey })
            const infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
            const web3Provider = new Web3(infuraEndpoint)
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, envConfig.prototypeContractAddress)

            if (subscription) {
                const currentDate = new Date()
                const expiryDate = subscription.expiresAt

                if (currentDate > expiryDate) {
                    await MasterSubscriptionModel.findOneAndDelete({ apiKey })
                    await ReplicaSubscriptionModel.findOneAndDelete({ apiKey })
                    return res.status(403).json({ msg: statusMessages.apiKeyExpired })
                }

                else {
                    const airlakeUsedTokens = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
                    const evolakeUsedTokens = await EvolakeQueryModel.find({ apiKey }).countDocuments() * apiPricing.evolake
                    const frostlakeUsedTokens = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
                    const wealthnowUsedTokens = await WealthnowAssetModel.find({ apiKey }).countDocuments() * apiPricing.wealthnow
                    const snowlakeUsedTokens = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
                    const usedTokens = airlakeUsedTokens + evolakeUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + wealthnowUsedTokens
                    req.headers.id = subscription.owner.toString()

                    if (usedTokens < subscriptionConfig[`${subscription.selectedPlan.toLowerCase()}SubscriptionConfig`].grantedTokens) {
                        next()
                    }

                    else {
                        return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                    }
                }
            }

            else {
                return res.status(403).json({ msg: statusMessages.invalidApiKey })
            }
        }

        catch (error) {
            return res.status(403).json({ msg: statusMessages.invalidApiKey })
        }
    }
}

export { apiKeyAuthorizer } 