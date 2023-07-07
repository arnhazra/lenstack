import { Request, Response, NextFunction } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import AirlakeHistoryModel from '../models/AirlakeHistoryModel'
import SubscriptionModel from '../models/SubscriptionModel'
import EvolakeQueryModel from '../models/EvolakeQueryModel'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'

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

            if (subscription) {
                const currentDate = new Date()
                const expiryDate = subscription.expiresAt

                if (currentDate > expiryDate) {
                    await SubscriptionModel.findOneAndDelete({ apiKey })
                    return res.status(403).json({ msg: statusMessages.apiKeyExpired })
                }

                else {
                    if (req.originalUrl.includes('airlake')) {
                        const documentCount = await AirlakeHistoryModel.find({ apiKey }).countDocuments()
                        req.headers.id = subscription.owner.toString()

                        if (subscription.selectedPlan === 'Standard') {
                            if (documentCount < subscriptionConfig.standardSubscriptionConfig.requestLimit.airlake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }

                        if (subscription.selectedPlan === 'Premium') {
                            if (documentCount < subscriptionConfig.premiumSubscriptionConfig.requestLimit.airlake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }
                    }

                    if (req.originalUrl.includes('evolake')) {
                        const documentCount = await EvolakeQueryModel.find({ apiKey }).countDocuments()
                        req.headers.id = subscription.owner.toString()

                        if (subscription.selectedPlan === 'Standard') {
                            if (documentCount < subscriptionConfig.standardSubscriptionConfig.requestLimit.evolake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }

                        if (subscription.selectedPlan === 'Premium') {
                            if (documentCount < subscriptionConfig.premiumSubscriptionConfig.requestLimit.evolake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }
                    }

                    if (req.originalUrl.includes('icelake')) {
                        const documentCount = await IcelakeDocumentModel.find({ apiKey }).countDocuments()
                        req.headers.id = subscription.owner.toString()

                        if (subscription.selectedPlan === 'Standard') {
                            if (documentCount < subscriptionConfig.standardSubscriptionConfig.requestLimit.icelake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }

                        if (subscription.selectedPlan === 'Premium') {
                            if (documentCount < subscriptionConfig.premiumSubscriptionConfig.requestLimit.icelake) {
                                next()
                            }

                            else {
                                return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                            }
                        }
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