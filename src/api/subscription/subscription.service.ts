import Web3 from "web3"
import { Injectable, BadRequestException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { statusMessages } from "src/constants/statusMessages"
import { otherConstants } from "src/constants/otherConstants"
import { envConfig } from "src/config/envConfig"
import { SubscribeDto } from "./dto/subscribe.dto"
import { SubscriptionModel } from "./entities/subscription.entity"
import { apiPricing } from "src/config/subscriptionConfig"
import { AirlakeRepository } from "../apps/airlake/airlake.repository"
import { FrostlakeRepository } from "../apps/frostlake/frostlake.repository"
import { DwalletRepository } from "../apps/dwallet/dwallet.repository"
import { SwapstreamRepository } from "../apps/swapstream/swapstream.repository"
import { SnowlakeRepository } from "../apps/snowlake/snowlake.repository"
import { CruxqlRepository } from "../apps/cruxql/cruxql.repository"
import { EasenftRepository } from "../apps/easenft/easenft.repository"
import { VuelockRepository } from "../apps/vuelock/vuelock.repository"

@Injectable()
export class SubscriptionService {
  private readonly infuraEndpoint: string
  private readonly web3Provider: Web3

  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository,
    private readonly airlakeRepository: AirlakeRepository,
    private readonly dwalletRepository: DwalletRepository,
    private readonly frostlakeRepository: FrostlakeRepository,
    private readonly swapstreamRepository: SwapstreamRepository,
    private readonly snowlakeRepository: SnowlakeRepository,
    private readonly cruxqlRepository: CruxqlRepository,
    private readonly easenftRepository: EasenftRepository,
    private readonly vuelockRepository: VuelockRepository) {
    this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
    this.web3Provider = new Web3(this.infuraEndpoint)
  }

  async activateTrial(userId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)
      const owner = user.id

      if (user.trialAvailable) {
        const selectedPlan = "Trial"
        const apiKey = "ak-" + randomBytes(16).toString("hex")
        await this.subscriptionRepository.createNewSubscription(owner, selectedPlan, apiKey)
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
      const { selectedPlan, transactionHash } = subscribeDto
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
          await this.subscriptionRepository.createNewSubscription(userId, selectedPlan, apiKey)
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

  async getUsageByApiKey(userId: string) {
    try {
      const subscription = await SubscriptionModel.findOne({ owner: userId })

      if (subscription) {
        const { apiKey } = subscription
        const airlakeUsedCredits = await this.airlakeRepository.findCountByApiKey(apiKey) * apiPricing.airlake
        const cruxqlUsedCredits = await this.cruxqlRepository.findCountByApiKey(apiKey) * apiPricing.cruxql
        const dwalletUsedCredits = await this.dwalletRepository.findCountByApiKey(apiKey) * apiPricing.dwallet
        const easeNftUsedCredits = await this.easenftRepository.findCountByApiKey(apiKey) * apiPricing.easenft
        const frostlakeUsedCredits = await this.frostlakeRepository.findCountByApiKey(apiKey) * apiPricing.frostlake
        const snowlakeUsedCredits = await this.snowlakeRepository.findCountByApiKey(apiKey) * apiPricing.snowlake
        const swapstreamUsedCredits = await this.swapstreamRepository.findCountByApiKey(apiKey) * apiPricing.swapstream
        const vuelockUsedCredits = await this.vuelockRepository.findCountByApiKey(apiKey) * apiPricing.vuelock

        const usedCredits = airlakeUsedCredits +
          cruxqlUsedCredits +
          dwalletUsedCredits +
          easeNftUsedCredits +
          frostlakeUsedCredits +
          snowlakeUsedCredits +
          swapstreamUsedCredits +
          vuelockUsedCredits

        return { usedCredits }
      }

      else {
        return { message: "No Active Subscriptions" }
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
