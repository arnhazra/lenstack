import Web3 from "web3"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { envConfig } from "src/config/env.config"
import { SubscribeDto } from "./dto/subscribe.dto"
import { SubscriptionConfigType, subscriptionConfig } from "src/config/subscription.config"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"
import { createNewSubscriptionCommand } from "./commands/create-subscription.command"
import { deleteSubscriptionCommand } from "./commands/delete-subscription.command"
import { findUserByIdQuery } from "../user/queries/find-user-by-id"
import { updateTrialStatusCommand } from "../user/commands/update-trial-status.command"

@Injectable()
export class SubscriptionService {
  private readonly web3Provider: Web3

  constructor(
    private readonly httpService: HttpService) {
    this.web3Provider = new Web3(envConfig.infuraGateway)
  }

  async activateTrial(userId: string, workspaceId: string) {
    try {
      const user = await findUserByIdQuery(userId)

      if (user.trialAvailable) {
        const selectedPlan = "Trial"
        await createNewSubscriptionCommand(workspaceId, selectedPlan)
        await updateTrialStatusCommand(userId, false)
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
      const { privateKey } = await findUserByIdQuery(userId)
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
          await deleteSubscriptionCommand(workspaceId)
          await createNewSubscriptionCommand(workspaceId, selectedPlan)
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
