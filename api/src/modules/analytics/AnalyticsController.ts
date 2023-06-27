import statusMessages from '../../constants/statusMessages'
import AnalyticsModel from './AnalyticsModel'
import { Request, Response } from 'express'

export default class AnalyticsController {
    async createAnalytics(owner: string, query: string, response: string, subscriptionKey: string) {
        try {
            const analytics = new AnalyticsModel({ owner, query, response, subscriptionKey })
            await analytics.save()
        }

        catch (error) {
            throw error
        }
    }

    async getAnalyticsByUser(req: Request, res: Response) {
        try {
            const userId = req.headers.id as string
            const analyticsList = await AnalyticsModel.find({ owner: userId }).sort({ date: -1 })
            return res.status(200).json({ analyticsList })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async countAnalyticsBySubKey(subscriptionKey: string) {
        try {
            const analyticsCount = await AnalyticsModel.find({ subscriptionKey: subscriptionKey }).countDocuments()
            return analyticsCount
        } catch (error) {
            throw error
        }
    }

    async getAnalyticsByQuery(query: string) {
        try {
            const analytics = await AnalyticsModel.find({ query: query })
            return analytics
        } catch (error) {
            throw error
        }
    }
}