import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import { productConfig } from '../../config/productConfig'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import UserModel from '../models/UserModel'
import AirlakeHistoryModel from '../models/AirlakeHistoryModel'
import EvolakeQueryModel from '../models/EvolakeQueryModel'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'
import SnowlakePrototypeModel from '../models/SnowlakePrototypeModel'

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

    async getUsageBySubscriptionKey(req: Request, res: Response) {
        try {
            const userId = req.headers.id
            const { subscriptionKey } = await UserModel.findById(userId)
            const airlakeApiRequestCount = await AirlakeHistoryModel.find({ subscriptionKey }).countDocuments()
            const evolakeQueryCount = await EvolakeQueryModel.find({ subscriptionKey }).countDocuments()
            const icelakeDocumentCount = await IcelakeDocumentModel.find({ subscriptionKey }).countDocuments()
            const snowlakePrototypeCount = await SnowlakePrototypeModel.find({ subscriptionKey }).countDocuments()
            const frostlakeAnalyticsCount = 0
            return res.status(200).json({ airlakeApiRequestCount, evolakeQueryCount, icelakeDocumentCount, snowlakePrototypeCount, frostlakeAnalyticsCount })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: statusMessages.connectionError, error })
        }
    }
}