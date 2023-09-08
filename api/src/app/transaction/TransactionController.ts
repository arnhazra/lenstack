import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { statusMessages } from "../../constants/statusMessages"
import TransactionModel from "./TransactionModel"
import UserModel from "../user/UserModel"

export default class TransactionController {
    async setPaymentStatus(req: Request, res: Response) {
        const { paymentStatus } = req.body
        const owner = req.headers.id

        try {
            await UserModel.findByIdAndUpdate(owner, { paymentStatus })
            return res.status(200).json({ msg: statusMessages.transactionCreationSuccess })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getCurrentPaymentStatus(req: Request, res: Response) {
        const owner = req.headers.id

        try {
            const { paymentStatus } = await UserModel.findById(owner)
            return res.status(200).json({ paymentStatus })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async createTransaction(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { transactionType, fromAddress, ethAmount, txHash } = req.body

            try {
                const transaction = new TransactionModel({ owner: req.headers.id, transactionType, fromAddress, ethAmount, txHash })
                await transaction.save()
                return res.status(200).json({ msg: statusMessages.transactionCreationSuccess, transaction })
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.transactionCreationError })
            }
        }
    }

    async getTransactions(req: Request, res: Response) {
        try {
            const transactions = await TransactionModel.find({ owner: req.headers.id }).sort({ createdAt: -1 }).limit(10)
            return res.status(200).json({ transactions })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}