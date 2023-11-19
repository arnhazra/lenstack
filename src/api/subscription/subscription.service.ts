import Web3 from "web3"
import { Injectable, BadRequestException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { statusMessages } from "src/constants/status-messages"
import { envConfig } from "src/config/env.config"
import { SubscribeDto } from "./dto/subscribe.dto"
import { SubscriptionConfigType, subscriptionConfig } from "src/config/subscription.config"

@Injectable()
export class SubscriptionService {
  private readonly web3Provider: Web3

  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository) {
    this.web3Provider = new Web3(envConfig.infuraGateway)
  }

  async activateTrial(userId: string, workspaceId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)

      if (user.trialAvailable) {
        const selectedPlan = "Trial"
        const apiKey = "ak-" + randomBytes(16).toString("hex")
        await this.subscriptionRepository.createNewSubscription(workspaceId, selectedPlan, apiKey)
        await this.userRepository.findUserByIdAndUpdateTrialStatus(userId, false)
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

  async subscribe(userId: string, workspaceId: string, subscribeDto: SubscribeDto) {
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
          const subscription = await this.subscriptionRepository.findSubscriptionByWorkspaceIdAndDelete(workspaceId)
          let apiKey: string = ""
          if (subscription) {
            apiKey = subscription.apiKey
          }

          else {
            apiKey = "ak-" + randomBytes(16).toString("hex")
          }

          await this.subscriptionRepository.createNewSubscription(workspaceId, selectedPlan, apiKey)
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

  getSubscriptionConfig(): SubscriptionConfigType {
    try {
      return subscriptionConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
