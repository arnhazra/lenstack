import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { platformConfig } from '../../config/platformConfig'
import { creditsCostConfig } from '../../config/creditsCostConfig'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import SubscriptionModel from '../models/SubscriptionModel'
import { envConfig } from '../../config/envConfig'

export default class CommonController {
    async getPlatformConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(platformConfig)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getSubscriptionAndCostConfig(req: Request, res: Response) {
        try {
            return res.status(200).json({ subscriptionConfig, creditsCostConfig })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getUsageByApiKey(req: Request, res: Response) {
        try {
            const userId = req.headers.id
            const subscription = await SubscriptionModel.findOne({ owner: userId })

            if (subscription) {
                const { availableCredits } = subscription
                return res.status(200).json({ availableCredits })
            }

            else {
                return res.status(200).json({ msg: 'No Active Subscription Found' })
            }
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError, error })
        }
    }

    async getSecrets(req: Request, res: Response) {
        try {
            const { tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey } = envConfig
            return res.status(200).json({ tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}