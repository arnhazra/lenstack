import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import IcelakeDocumentModel from '../models/IcelakeDocumentModel'

export default class IcelakeController {
    async createDocument(req: Request, res: Response) {
        const { title, content, subscriptionKey } = req.body

        try {
            const userId = req.headers.id
            let document = new IcelakeDocumentModel({ owner: userId, title, content, subscriptionKey })
            await document.save()
            return res.status(200).json({ msg: 'Document created' })
        }
        catch (error) {
            return res.status(500).json({ msg: 'Error creating document' })
        }
    }

    async getAllDocuments(req: Request, res: Response) {
        try {
            const userId = req.headers.id as string
            const documents = await IcelakeDocumentModel.find({ owner: userId }).select('-content').sort({ date: -1 })
            return res.status(200).json(documents)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async saveDocument(req: Request, res: Response) {
        try {
            const { docId } = req.params
            const document = await IcelakeDocumentModel.findById(docId)
            return res.status(200).json({ document })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async deleteDocument(req: Request, res: Response) {
        try {
            const { docId } = req.params
            await IcelakeDocumentModel.findByIdAndDelete(docId)
            return res.status(200).json({ msg: 'Document deleted' })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}