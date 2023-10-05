import { Injectable, BadRequestException } from "@nestjs/common"
import { randomBytes } from "crypto"
import Web3 from "web3"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { statusMessages } from "src/constants/statusMessages"
import { otherConstants } from "src/constants/otherConstants"
import { envConfig } from "src/config/envConfig"
import { SubscribeDto } from "./dto/subscribe.dto"
import { prototypeABI } from "src/bin/prototypeABI"
import { SubscriptionModel } from "./entities/subscription.entity"
import { apiPricing } from "src/config/subscriptionConfig"
import { AirlakeRepository } from "../apps/airlake/airlake.repository"
import { FrostlakeRepository } from "../apps/frostlake/frostlake.repository"
import { WealthnowRepository } from "../apps/wealthnow/wealthnow.repository"

@Injectable()
export class SubscriptionService {
  private readonly infuraEndpoint: string
  private readonly web3Provider: Web3

  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository,
    private readonly airlakeRepository: AirlakeRepository,
    private readonly frostlakeRepository: FrostlakeRepository,
    private readonly wealthnowRepository: WealthnowRepository) {
    this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
    this.web3Provider = new Web3(this.infuraEndpoint)
  }

  async activateTrial(userId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)
      const owner = user.id

      if (user.trialAvailable) {
        const tokenId = "00000000"
        const selectedPlan = "Trial"
        const apiKey = "ak-" + randomBytes(16).toString("hex")
        await this.subscriptionRepository.createNewSubscription(owner, selectedPlan, apiKey, tokenId)
        await this.userRepository.findUserByIdAndUpdate(owner, "trialAvailable", false)
        return true
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async subscribe(userId: string, subscribeDto: SubscribeDto) {
    try {
      const { tokenId, selectedPlan, transactionHash } = subscribeDto
      const { privateKey } = await this.userRepository.findUserById(userId)
      const { address: walletAddress } = this.web3Provider.eth.accounts.privateKeyToAccount(privateKey)
      const tx = await this.web3Provider.eth.getTransaction(transactionHash)
      const block = await this.web3Provider.eth.getBlock(tx.blockNumber)

      if (walletAddress.toLowerCase() == tx.from.toLowerCase()) {
        const currentBlock = await this.web3Provider.eth.getBlock("latest")
        const currentTimestamp = currentBlock.timestamp
        const transactionTimestamp = block.timestamp
        const timeTolerance = 30

        if (currentTimestamp - transactionTimestamp > timeTolerance) {
          throw new BadRequestException(statusMessages.connectionError)
        }

        else {
          await this.subscriptionRepository.findSubscriptionByUserIdAndDelete(userId)
          const apiKey = "ak-" + randomBytes(16).toString("hex")
          await this.subscriptionRepository.createNewSubscription(userId, selectedPlan, apiKey, tokenId)
          return true
        }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async unsubscribe(userId: string) {
    try {
      await this.subscriptionRepository.findSubscriptionByUserIdAndDelete(userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async getUsageByApiKey(userId: string) {
    try {
      const prototypeContract: any = new this.web3Provider.eth.Contract(prototypeABI as any, envConfig.prototypeContractAddress)
      const subscription = await SubscriptionModel.findOne({ owner: userId })

      if (subscription) {
        const { apiKey } = subscription
        const airlakeUsedTokens = await this.airlakeRepository.findCountByApiKey(apiKey) * apiPricing.airlake
        const frostlakeUsedTokens = await this.frostlakeRepository.findCountByApiKey(apiKey) * apiPricing.frostlake
        const snowlakeUsedTokens = Number(await prototypeContract.methods.getPrototypeCountByAPIKey(apiKey).call()) * apiPricing.snowlake
        const wealthnowUsedTokens = await this.wealthnowRepository.findCountByApiKey(apiKey) * apiPricing.frostlake
        const usedTokens = airlakeUsedTokens + frostlakeUsedTokens + snowlakeUsedTokens + wealthnowUsedTokens
        return { usedTokens }
      }

      else {
        return { message: "No Active Subscriptions" }
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
