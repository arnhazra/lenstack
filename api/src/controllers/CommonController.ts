import { Request, Response } from 'express'
import Web3 from 'web3'
import { statusMessages } from '../constants/statusMessages'
import { platformConfig } from '../../config/platformConfig'
import { subscriptionConfig } from '../../config/subscriptionConfig'
import AirlakeHistoryModel from '../models/AirlakeHistoryModel'
import EvolakeQueryModel from '../models/EvolakeQueryModel'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'
import SubscriptionModel from '../models/SubscriptionModel'
import { otherConstants } from '../constants/otherConstants'
import { prototypeABI } from '../bin/prototypeABI'

export default class CommonController {
    async getPlatformConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(platformConfig)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getSubscriptionConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(subscriptionConfig)
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getUsageByApiKey(req: Request, res: Response) {
        try {
            const web3Provider = new Web3(otherConstants.infuraEndpoint)
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, '0xe1c28a27DEAf93f8efa804391f50169FAEf63591')
            const userId = req.headers.id
            const subscription = await SubscriptionModel.findOne({ owner: userId })

            if (subscription) {
                const { apiKey } = subscription
                const airlakeApiRequestCount = await AirlakeHistoryModel.find({ apiKey }).countDocuments()
                const evolakeQueryCount = await EvolakeQueryModel.find({ apiKey }).countDocuments()
                const icelakeDocumentCount = await IcelakeDocumentModel.find({ apiKey }).countDocuments()
                const snowlakePrototypeCount = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call())
                return res.status(200).json({ airlakeApiRequestCount, evolakeQueryCount, icelakeDocumentCount, snowlakePrototypeCount })
            }

            else {
                return res.status(200).json({ msg: 'No Active Subscription Found' })
            }
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError, error })
        }
    }
}