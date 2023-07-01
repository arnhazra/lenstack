import { Request, Response, NextFunction } from 'express'
import { statusMessages } from '../constants/statusMessages'
import UserModel from '../models/UserModel'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'

async function icelakeApiAuthorizer(req: Request, res: Response, next: NextFunction) {
    const { subscriptionKey } = req.body

    if (!subscriptionKey) {
        return res.status(403).json({ msg: statusMessages.subscribeToContinue })
    }

    else {
        try {
            const user = await UserModel.findOne({ subscriptionKey })

            if (user) {
                const documentCount = await IcelakeDocumentModel.find({ subscriptionKey: subscriptionKey }).countDocuments()
                req.headers.id = user.id

                if (subscriptionKey.startsWith('sk')) {
                    if (documentCount < subscriptionConfig.standardSubscriptionConfig.requestLimit.icelake) {
                        next()
                    }

                    else {
                        return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                    }
                }

                else if (subscriptionKey.startsWith('pk')) {
                    if (documentCount < subscriptionConfig.premiumSubscriptionConfig.requestLimit.icelake) {
                        next()
                    }

                    else {
                        return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                    }
                }

                else {
                    return res.status(403).json({ msg: statusMessages.invalidApiKey })
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

export { icelakeApiAuthorizer } 