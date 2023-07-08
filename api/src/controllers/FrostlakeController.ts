import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import FrostlakeAnalyticsModel from '../models/FrostlakeAnalyticsModel'

export default class FrostlakeController {
    async createAnalytics(req: Request, res: Response) {
        const { project, component, event, info, statusCode, apiKey } = req.body

        try {
            const userId = req.headers.id
            const analytics = new FrostlakeAnalyticsModel({ owner: userId, project, component, event, info, statusCode, apiKey })
            await analytics.save()
            return res.status(200).json({ msg: 'Analytics created' })
        }
        catch (error) {
            return res.status(500).json({ msg: 'Error creating analytics' })
        }
    }

    async getAnalytics(req: Request, res: Response) {
        try {
            const userId = req.headers.id as string
            const analyticsArray = await FrostlakeAnalyticsModel.find({ owner: userId }).sort({ createdAt: -1 })
            return res.status(200).json({ analyticsArray })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}