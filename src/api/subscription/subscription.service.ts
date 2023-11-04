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

@Injectable()
export class SubscriptionService {
  private readonly infuraEndpoint: string
  private readonly web3Provider: Web3

  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository) {
    this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraSecret
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
        const { remainingCredits } = subscription
        return { remainingCredits }
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
