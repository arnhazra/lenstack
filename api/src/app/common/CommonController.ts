import { Request, Response } from "express"
import Web3 from "web3"
import { statusMessages } from "../../constants/statusMessages"
import { platformConfig } from "../../../config/platformConfig"
import { apiPricing, subscriptionConfig } from "../../../config/subscriptionConfig"
import AirlakeHistoryModel from "../products/airlake/AirlakeHistoryModel"
import EvolakeQueryModel from "../products/evolake/EvolakeQueryModel"
import IcelakeDocumentModel from "../products/icelake/IcelakeDocumentModel"
import SubscriptionModel from "../subscription/SubscriptionModel"
import { otherConstants } from "../../constants/otherConstants"
import { prototypeABI } from "../../bin/prototypeABI"
import FrostlakeAnalyticsModel from "../products/frostlake/FrostlakeAnalyticsModel"
import { envConfig } from "../../../config/envConfig"
import WealthnowAssetModel from "../products/wealthnow/WealthnowAssetModel"

export default class CommonController {
    async getPlatformConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(platformConfig)
        }

        catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getSubscriptionConfig(req: Request, res: Response) {
        try {
            return res.status(200).json(subscriptionConfig)
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }

    async getUsageByApiKey(req: Request, res: Response) {
        try {
            const infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
            const web3Provider = new Web3(infuraEndpoint)
            const prototypeContract: any = new web3Provider.eth.Contract(prototypeABI as any, envConfig.prototypeContractAddress)
            const userId = req.headers.id
            const subscription = await SubscriptionModel.findOne({ owner: userId })

            if (subscription) {
                const { apiKey } = subscription
                const airlakeUsedTokens = await AirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
                const evolakeUsedTokens = await EvolakeQueryModel.find({ apiKey }).countDocuments() * apiPricing.evolake
                const icelakeUsedTokens = await IcelakeDocumentModel.find({ apiKey }).countDocuments() * apiPricing.icelake
                const frostlakeUsedTokens = await FrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
                const wealthnowUsedTokens = await WealthnowAssetModel.find({ apiKey }).countDocuments() * apiPricing.wealthnow
                const snowlakeUsedTokens = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
                const usedTokens = airlakeUsedTokens + evolakeUsedTokens + icelakeUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + wealthnowUsedTokens
                return res.status(200).json({ usedTokens })
            }

            else {
                return res.status(200).json({ msg: "No Active Subscription Found" })
            }
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError, error })
        }
    }

    async getContractAddresses(req: Request, res: Response) {
        try {
            const { tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey } = envConfig
            return res.status(200).json({ tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey })
        } catch (error) {
            return res.status(500).json({ msg: statusMessages.connectionError })
        }
    }
}