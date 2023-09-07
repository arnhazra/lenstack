import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Web3 from "web3"
import crypto from "crypto"
import otptool from "otp-without-db"
import { validationResult } from "express-validator"
import { statusMessages } from "../../constants/statusMessages"
import UserModel from "./UserModel"
import { sendEmail } from "../../utils/sendEmail"
import { setTokenInRedis, getTokenFromRedis, removeTokenFromRedis } from "../../utils/redisHelper"
import { otherConstants } from "../../constants/otherConstants"
import { envConfig } from "../../../config/envConfig"
import SubscriptionModel from "./SubscriptionModel"

export default class UserController {
    public otpKey: string
    public authPrivateKey: string
    public infuraEndpoint: string
    public web3Provider: Web3

    constructor() {
        this.otpKey = envConfig.otpKey
        this.authPrivateKey = envConfig.authPrivateKey
        this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
        this.web3Provider = new Web3(this.infuraEndpoint)
    }

    async requestAuthCode(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email } = req.body

            try {
                let user = await UserModel.findOne({ email })
                const otp = Math.floor(100000 + Math.random() * 900000)
                const hash = otptool.createNewOTP(email, otp, this.otpKey, 5, "sha256")
                await sendEmail(email, otp)
                if (user) {
                    return res.status(200).json({ hash, newuser: false, msg: statusMessages.authCodeEmail })
                }

                else {
                    return res.status(200).json({ hash, newuser: true, msg: statusMessages.authCodeEmail })
                }
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }

    async verifyAuthCode(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array()[0].msg })
        }

        else {
            const { email, otp, hash, privateKey } = req.body

            try {
                const isOTPValid = otptool.verifyOTP(email, otp, hash, this.otpKey, "sha256")

                if (isOTPValid) {
                    let user = await UserModel.findOne({ email })

                    if (user) {
                        const redisAccessToken = await getTokenFromRedis(user.id)

                        if (redisAccessToken) {
                            const accessToken = redisAccessToken
                            return res.status(200).json({ accessToken })
                        }

                        else {
                            const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
                            const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
                            await setTokenInRedis(user.id, accessToken)
                            return res.status(200).json({ accessToken })
                        }
                    }

                    else {
                        const { name } = req.body || otherConstants.undefinedName
                        user = new UserModel({ name, email, privateKey })
                        const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
                        const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
                        await setTokenInRedis(user.id, accessToken)
                        await user.save()
                        const tokenId = "000000"
                        const selectedPlan = "Trial"
                        const owner = user.id
                        const apiKey = "ak-" + crypto.randomBytes(16).toString("hex")
                        const subscription = new SubscriptionModel({ owner, selectedPlan, apiKey, tokenId })
                        await subscription.save()
                        return res.status(200).json({ accessToken, user })
                    }
                }

                else {
                    return res.status(400).json({ msg: statusMessages.invalidAuthCode })
                }
            }

            catch (error) {
                return res.status(500).json({ msg: statusMessages.connectionError })
            }
        }
    }

    async userDetails(req: Request, res: Response) {
        try {
            const user = await UserModel.findById(req.headers.id)
            if (user) {
                const userId = user.id
                const subscription = await SubscriptionModel.findOne({ owner: userId })
                if (subscription) {
                    const currentDate = new Date()
                    const expiryDate = subscription.expiresAt

                    if (currentDate > expiryDate) {
                        await SubscriptionModel.findOneAndDelete({ owner: userId })
                        return res.status(200).json({ user })
                    }

                    else {
                        return res.status(200).json({ user, subscription })
                    }
                }
                else {
                    return res.status(200).json({ user })
                }
            }

            else {
                return res.status(401).json({ msg: statusMessages.unauthorized })
            }
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async signOut(req: Request, res: Response) {
        try {
            await removeTokenFromRedis(req.headers.id as string)
            return res.status(200).json({ msg: statusMessages.signOutSuccess })
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
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