import { Request, Response, NextFunction } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { apiPricing, subscriptionConfig } from '../../config/subscriptionConfig'
import AirlakeHistoryModel from '../app/products/airlake/AirlakeHistoryModel'
import SubscriptionModel from '../app/user/SubscriptionModel'
import EvolakeQueryModel from '../app/products/evolake/EvolakeQueryModel'
import IcelakeDocumentModel from '../app/products/icelake/IcelakeDocumentModel'
import FrostlakeAnalyticsModel from '../app/products/frostlake/FrostlakeAnalyticsModel'
import Web3 from 'web3'
import { otherConstants } from '../constants/otherConstants'
import { envConfig } from '../../config/envConfig'
import { prototypeABI } from '../bin/prototypeABI'

async function apiKeyAuthorizer(req: Request, res: Response, next: NextFunction) {
    const apiKeyFromParams = req.params.apiKey
    const apiKeyFromBody = req.body.apiKey

    const apiKey = apiKeyFromParams ? apiKeyFromParams : apiKeyFromBody

    if (!apiKey) {
        return res.status(403).json({ msg: statusMessages.subscribeToContinue })
    }

    else {
        try {
            const subscription = await SubscriptionModel.findOne({ apiKey })
            const infuraEndpoint = otherConstants.infuraEndpoint + '/' + envConfig.infuraApiKey
            const web3Provider = new Web3(infuraEndpoint)
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, envConfig.prototypeContractAddress)

            if (subscription) {
                const currentDate = new Date()
                const expiryDate = subscription.expiresAt

                if (currentDate > expiryDate) {
                    await SubscriptionModel.findOneAndDelete({ apiKey })
                    return res.status(403).json({ msg: statusMessages.apiKeyExpired })
                }

                else {
                    const airlakeUsedCredits = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
                    const evolakeUsedCredits = await EvolakeQueryModel.find({ apiKey }).countDocuments() * apiPricing.evolake
                    const icelakeUsedCredits = await IcelakeDocumentModel.find({ apiKey }).countDocuments() * apiPricing.icelake
                    const frostlakeUsedCredits = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
                    const snowlakeUsedCredits = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
                    const usedCredits = airlakeUsedCredits + evolakeUsedCredits + icelakeUsedCredits + frostlakeUsedCredits + snowlakeUsedCredits
                    req.headers.id = subscription.owner.toString()

                    if (usedCredits < subscriptionConfig[`${subscription.selectedPlan.toLowerCase()}SubscriptionConfig`].grantedCredits) {
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