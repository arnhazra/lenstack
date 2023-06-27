import { Request, Response } from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { envConfig } from '../../../config/envConfig'
import AnalyticsController from '../analytics/AnalyticsController'
import statusMessages from '../../constants/statusMessages'

export default class QueryController {
    public analyticsController: AnalyticsController

    constructor() {
        this.analyticsController = new AnalyticsController()
    }

    async generateQuery(req: Request, res: Response) {
        try {
            const { selectedDb, userQuery, subscriptionKey } = req.body
            const finalQuery = `Create a ${selectedDb} request to ${userQuery.charAt(0).toLowerCase() + userQuery.slice(1)}`

            const dbResponse = await this.analyticsController.getAnalyticsByQuery(finalQuery)

            if (dbResponse.length > 0) {
                const dbGeneratedQuery = dbResponse[0].response
                this.analyticsController.createAnalytics(req.headers.id as string, finalQuery, dbGeneratedQuery, subscriptionKey)
                return res.status(200).json({ msg: dbGeneratedQuery, from: 'DB' })
            }

            else {
                const configuration = new Configuration({ apiKey: envConfig.openAIApiKey })
                const openai = new OpenAIApi(configuration)

                const response = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: finalQuery,
                    temperature: 0.3,
                    max_tokens: 120,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                })
                const aiGeneratedQuery = response.data.choices[0].text
                this.analyticsController.createAnalytics(req.headers.id as string, finalQuery, aiGeneratedQuery, subscriptionKey)
                return res.status(200).json({ msg: aiGeneratedQuery, from: 'AI' })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}