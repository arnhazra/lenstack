import { Request, Response } from "express"
import Web3 from "web3"
import crypto from "crypto"
import { statusMessages } from "../../constants/statusMessages"
import UserModel from "../user/UserModel"
import { otherConstants } from "../../constants/otherConstants"
import { envConfig } from "../../../config/envConfig"
import SubscriptionModel from "./SubscriptionModel"

export default class SubscriptionController {
    public infuraEndpoint: string
    public web3Provider: Web3

    constructor() {
        this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
        this.web3Provider = new Web3(this.infuraEndpoint)
    }

    async subscribe(req: Request, res: Response) {
        const { tokenId, selectedPlan, transactionHash } = req.body
        const owner = req.headers.id

        try {
            const { privateKey } = await UserModel.findById(owner)
            const { address: walletAddress } = this.web3Provider.eth.accounts.privateKeyToAccount(privateKey)
            const tx = await this.web3Provider.eth.getTransaction(transactionHash)
            const block = await this.web3Provider.eth.getBlock(tx.blockNumber)

            if (walletAddress.toLowerCase() == tx.from.toLowerCase()) {
                const currentBlock = await this.web3Provider.eth.getBlock("latest")
                const currentTimestamp = currentBlock.timestamp
                const transactionTimestamp = block.timestamp
                const timeTolerance = 30

                if (currentTimestamp - transactionTimestamp > timeTolerance) {
                    res.status(400).json({ msg: statusMessages.subscriptionFailure })
                    return
                }

                else {
                    await SubscriptionModel.findOneAndDelete({ owner })
                    const apiKey = "ak-" + crypto.randomBytes(16).toString("hex")
                    const subscription = new SubscriptionModel({ owner, selectedPlan, apiKey, tokenId })
                    await subscription.save()
                    return res.status(200).json({ msg: statusMessages.subscriptionSuccess })
                }
            }

            else {
                return res.status(500).json({ msg: statusMessages.subscriptionFailure })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.subscriptionFailure })
        }
    }

    async unsubscribe(req: Request, res: Response) {
        const userId = req.headers.id

        try {
            await SubscriptionModel.findOneAndDelete({ owner: userId })
            return res.status(200).json({ msg: statusMessages.unsubscribeSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.unsubscribeFailure })
        }
    }
}