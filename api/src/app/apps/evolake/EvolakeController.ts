import { Request, Response } from "express"
import OpenAI from "openai"
import { statusMessages } from "../../../constants/statusMessages"
import { MasterEvolakeQueryModel, ReplicaEvolakeQueryModel } from "./EvolakeQueryModel"

export default class EvolakeController {
    async getDatabaseList(req: Request, res: Response) {
        try {
            const dbOptions = [
                { value: "SQL", label: "SQL" },
                { value: "MongoDB", label: "Mongo DB" },
                { value: "PostgreSQL", label: "Postgre SQL" },
                { value: "MariaDB", label: "Maria DB" },
                { value: "Firebase", label: "Firebase" },
                { value: "Prisma", label: "Prisma" },
                { value: "GraphQL", label: "GraphQL" },
                { value: "DynamoDB", label: "Dynamo DB" },
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
                const finalQuery = `Write a ${selectedDb} query to ${userQuery.charAt(0).toLowerCase() + userQuery.slice(1)}`
                const dbResponse = await MasterEvolakeQueryModel.find({ query: finalQuery })

                if (dbResponse.length > 0) {
                    const dbGeneratedQuery = dbResponse[0].response
                    return res.status(200).json({ msg: dbGeneratedQuery, from: "DB" })
                }

                else {
                    const openai = new OpenAI({
                        apiKey: process.env.OPENAI_API_KEY,
                    })

                    const response = await openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "Your job is to write queries given a user’s request." },
                            { role: "user", content: finalQuery }
                        ],
                        temperature: 0.3,
                        max_tokens: 120,
                        top_p: 1.0,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.0,
                    })
                    const aiGeneratedQuery = response.choices[0].message.content.split("```")[1]
                    const evolakeDbReq = new MasterEvolakeQueryModel({ owner: req.headers.id as string, query: finalQuery, response: aiGeneratedQuery, apiKey })
                    await evolakeDbReq.save()
                    const replicaEvolakeDbReq = new ReplicaEvolakeQueryModel({ _id: evolakeDbReq.id, owner: req.headers.id as string, query: finalQuery, response: aiGeneratedQuery, apiKey })
                    await replicaEvolakeDbReq.save()
                    return res.status(200).json({ msg: aiGeneratedQuery, from: "AI" })
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
            const queryHistory = await MasterEvolakeQueryModel.find({ owner: userId }).sort({ createdAt: -1 }).limit(10)
            return res.status(200).json({ queryHistory })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}