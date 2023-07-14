import { Request, Response, NextFunction } from 'express'
import { statusMessages } from '../constants/statusMessages'
import SubscriptionModel from '../models/SubscriptionModel'
import { creditsCostConfig } from '../../config/creditsCostConfig'

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
                        const { availableCredits } = subscription
                        req.headers.id = subscription.owner.toString()

                        if (availableCredits > creditsCostConfig.airlake) {
                            await SubscriptionModel.findOneAndUpdate({ apiKey }, { availableCredits: availableCredits - creditsCostConfig.airlake })
                            next()
                        }

                        else {
                            return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                        }
                    }

                    if (req.originalUrl.includes('evolake')) {
                        const { availableCredits } = subscription
                        req.headers.id = subscription.owner.toString()

                        if (availableCredits > creditsCostConfig.evolake) {
                            await SubscriptionModel.findOneAndUpdate({ apiKey }, { availableCredits: availableCredits - creditsCostConfig.evolake })
                            next()
                        }

                        else {
                            return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                        }
                    }

                    if (req.originalUrl.includes('icelake')) {
                        const { availableCredits } = subscription
                        req.headers.id = subscription.owner.toString()

                        if (availableCredits > creditsCostConfig.icelake) {
                            await SubscriptionModel.findOneAndUpdate({ apiKey }, { availableCredits: availableCredits - creditsCostConfig.icelake })
                            next()
                        }

                        else {
                            return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                        }
                    }

                    if (req.originalUrl.includes('frostlake')) {
                        const { availableCredits } = subscription
                        req.headers.id = subscription.owner.toString()

                        if (availableCredits > creditsCostConfig.frostlake) {
                            await SubscriptionModel.findOneAndUpdate({ apiKey }, { availableCredits: availableCredits - creditsCostConfig.frostlake })
                            next()
                        }

                        else {
                            return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
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