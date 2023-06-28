import { Request, Response } from 'express'
import { statusMessages } from '../constants/statusMessages'
import SnowlakePrototypeModel from '../models/SnowlakePrototypeModel'

export default class SnowlakeController {
    async createPrototype(req: Request, res: Response) {
        const { title, description, link, subscriptionKey } = req.body

        try {
            const userId = req.headers.id
            let prototype = new SnowlakePrototypeModel({ owner: userId, title, description, link, subscriptionKey })
            await prototype.save()
            return res.status(200).json({ msg: 'Prototype created' })
        }
        catch (error) {
            return res.status(500).json({ msg: 'Error creating Prototype' })
        }
    }

    async getAllPrototypes(req: Request, res: Response) {
        try {
            const userId = req.headers.id as string
            const prototypes = await SnowlakePrototypeModel.find({ owner: userId }).sort({ date: -1 })
            return res.status(200).json({ prototypes })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async viewPrototypeById(req: Request, res: Response) {
        try {
            const { prototypeId } = req.params
            const prototype = await SnowlakePrototypeModel.findById(prototypeId)
            return res.status(200).json({ prototype })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async deletePrototype(req: Request, res: Response) {
        try {
            const { prototypeId } = req.params
            await SnowlakePrototypeModel.findByIdAndDelete(prototypeId)
            return res.status(200).json({ msg: 'Prototype deleted' })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}