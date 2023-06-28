import { Request, Response, NextFunction } from 'express'
import { statusMessages } from '../constants/statusMessages'
import UserModel from '../models/UserModel'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import EvolakeQueryModel from '../models/EvolakeQueryModel'

async function evolakeApiAuthorizer(req: Request, res: Response, next: NextFunction) {
    const { subscriptionKey } = req.body

    if (!subscriptionKey) {
        return res.status(403).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const user = await UserModel.findOne({ subscriptionKey })

            if (user) {
                const documentCount = await EvolakeQueryModel.find({ subscriptionKey }).countDocuments()
                req.headers.id = user.id

                if (subscriptionKey.startsWith('sk')) {
                    if (documentCount < subscriptionConfig.standardSubscriptionConfig.requestLimit.evolake) {
                        next()
                    }

                    else {
                        return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                    }
                }

                else if (subscriptionKey.startsWith('pk')) {
                    if (documentCount < subscriptionConfig.premiumSubscriptionConfig.requestLimit.evolake) {
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

export { evolakeApiAuthorizer } 