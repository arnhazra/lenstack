import { Request, Response } from "express"
import Web3 from "web3"
import { statusMessages } from "../../constants/statusMessages"
import { platformConfig } from "../../../config/platformConfig"
import { apiPricing, subscriptionConfig } from "../../../config/subscriptionConfig"
import { MasterAirlakeHistoryModel } from "../apps/airlake/AirlakeHistoryModel"
import { MasterEvolakeQueryModel } from "../apps/evolake/EvolakeQueryModel"
import { MasterSubscriptionModel } from "../subscription/SubscriptionModel"
import { otherConstants } from "../../constants/otherConstants"
import { prototypeABI } from "../../bin/prototypeABI"
import { MasterFrostlakeAnalyticsModel } from "../apps/frostlake/FrostlakeAnalyticsModel"
import { envConfig } from "../../../config/envConfig"
import { MasterWealthnowAssetModel } from "../apps/wealthnow/WealthnowAssetModel"

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
            const subscription = await MasterSubscriptionModel.findOne({ owner: userId })

            if (subscription) {
                const { apiKey } = subscription
                const airlakeUsedTokens = await MasterAirlakeHistoryModel.find({ apiKey }).countDocuments() * apiPricing.airlake
                const evolakeUsedTokens = await MasterEvolakeQueryModel.find({ apiKey }).countDocuments() * apiPricing.evolake
                const frostlakeUsedTokens = await MasterFrostlakeAnalyticsModel.find({ apiKey }).countDocuments() * apiPricing.frostlake
                const wealthnowUsedTokens = await MasterWealthnowAssetModel.find({ apiKey }).countDocuments() * apiPricing.wealthnow
                const snowlakeUsedTokens = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
                const usedTokens = airlakeUsedTokens + evolakeUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + wealthnowUsedTokens
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