import { Request, Response } from 'express'
import { Configuration, OpenAIApi } from 'openai'
import { envConfig } from '../../config/envConfig'
import { statusMessages } from '../constants/statusMessages'
import EvolakeQueryModel from '../models/EvolakeQueryModel'

export default class EvolakeController {
    async getDatabaseList(req: Request, res: Response) {
        try {
            const dbOptions = [
                { value: 'SQL', label: 'SQL' },
                { value: 'MongoDB', label: 'Mongo DB' },
                { value: 'PostgreSQL', label: 'Postgre SQL' },
                { value: 'MariaDB', label: 'Maria DB' },
                { value: 'Firebase', label: 'Firebase' },
                { value: 'Prisma', label: 'Prisma' },
                { value: 'GraphQL', label: 'GraphQL' },
                { value: 'DynamoDB', label: 'Dynamo DB' },
            ]

            return res.status(200).json({ dbOptions })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async generateQuery(req: Request, res: Response) {
        try {
            const { selectedDb, userQuery, apiKey } = req.body

            if (selectedDb.length > 0 && userQuery.length > 0) {
                const finalQuery = `Create a ${selectedDb} request to ${userQuery.charAt(0).toLowerCase() + userQuery.slice(1)}`
                const dbResponse = await EvolakeQueryModel.find({ query: finalQuery })

                if (dbResponse.length > 0) {
                    const dbGeneratedQuery = dbResponse[0].response
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
                    const evolakeDbReq = new EvolakeQueryModel({ owner: req.headers.id as string, query: finalQuery, response: aiGeneratedQuery, apiKey })
                    await evolakeDbReq.save()
                    return res.status(200).json({ msg: aiGeneratedQuery, from: 'AI' })
                }
            }

            else {
                return res.status(500).json({ msg: statusMessages.evolakeErrorMessage })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getQueryHistoryByUser(req: Request, res: Response) {
        try {
            const userId = req.headers.id as string
            const queryHistory = await EvolakeQueryModel.find({ owner: userId }).sort({ date: -1 }).limit(10)
            return res.status(200).json({ queryHistory })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}