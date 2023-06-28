import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { productConfig } from '../../config/productConfig'
import { subscriptionConfig } from '../../config/subscriptionConfig'

export default class GeneralController {
    async getProductDetails(req: Request, res: Response) {
        try {
            return res.status(200).json(productConfig)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getProductSubscriptionConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(subscriptionConfig)
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}