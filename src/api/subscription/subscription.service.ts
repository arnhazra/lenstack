import Web3 from "web3"
import { Injectable, BadRequestException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { SubscriptionRepository } from "./subscription.repository"
import { UserRepository } from "../user/user.repository"
import { statusMessages } from "src/constants/status-messages"
import { envConfig } from "src/config/env.config"
import { SubscribeDto } from "./dto/subscribe.dto"
import { SubscriptionConfigType, subscriptionConfig } from "src/config/subscription.config"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"

@Injectable()
export class SubscriptionService {
  private readonly web3Provider: Web3

  constructor(private readonly subscriptionRepository: SubscriptionRepository,
    private readonly userRepository: UserRepository,
    private readonly httpService: HttpService) {
    this.web3Provider = new Web3(envConfig.infuraGateway)
  }

  async activateTrial(userId: string, workspaceId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)

      if (user.trialAvailable) {
        const clientId = randomBytes(16).toString("hex")
        const clientSecret = randomBytes(32).toString("hex")
        const selectedPlan = "Trial"
        await this.subscriptionRepository.createNewSubscription(workspaceId, selectedPlan, clientId, clientSecret)
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
          let clientId: string = ""
          let clientSecret: string = ""
          if (subscription) {
            clientId = subscription.clientId
            clientSecret = subscription.clientSecret
          }

          else {
            clientId = randomBytes(16).toString("hex")
            clientSecret = randomBytes(32).toString("hex")
          }

          await this.subscriptionRepository.createNewSubscription(workspaceId, selectedPlan, clientId, clientSecret)
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

  async signTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
