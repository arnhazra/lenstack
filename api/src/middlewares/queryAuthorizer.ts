import { Request, Response, NextFunction } from 'express'
import statusMessages from '../constants/statusMessages'
import { envConfig } from '../../config/envConfig'
import UserModel from '../modules/user/UserModel'
import AnalyticsController from '../modules/analytics/AnalyticsController'

async function queryAuthorizer(req: Request, res: Response, next: NextFunction) {
    const { selectedDb, userQuery, subscriptionKey } = req.body
    const analyticsController = new AnalyticsController()

    if (!subscriptionKey || !userQuery || !selectedDb) {
        return res.status(403).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const user = await UserModel.findOne({ subscriptionKey })

            if (user) {
                const analyticsCount = await analyticsController.countAnalyticsBySubKey(subscriptionKey)
                req.headers.id = user.id

                if (subscriptionKey.includes('Standard')) {
                    if (analyticsCount < Number(envConfig.standardSubscriptionReqLimit)) {
                        next()
                    }

                    else {
                        return res.status(403).json({ msg: statusMessages.apiKeyLimitReached })
                    }
                }

                else if (subscriptionKey.includes('Premium')) {
                    if (analyticsCount < Number(envConfig.premiumSubscriptionReqLimit)) {
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

export default queryAuthorizer