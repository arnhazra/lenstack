import Stripe from "stripe"
import Web3 from "web3"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { envConfig } from "src/env.config"
import { SubscribeDto } from "./dto/subscribe.dto"
import { SubscriptionPlans, subscriptionConfig } from "./subscription.config"
import { createNewSubscriptionCommand } from "./commands/create-subscription.command"
import { deleteSubscriptionCommand } from "./commands/delete-subscription.command"
import { findUserByIdQuery } from "../user/queries/find-user-by-id"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"

@Injectable()
export class SubscriptionService {
  private readonly web3Provider: Web3
  private readonly stripe: Stripe

  constructor(private readonly httpService: HttpService) {
    this.web3Provider = new Web3(envConfig.quicknodeGateway)
    this.stripe = new Stripe(envConfig.stripeSecretKey)
  }

  async activateHobby(userId: string) {
    try {
      const selectedPlan = SubscriptionPlans.Hobby
      await deleteSubscriptionCommand(userId)
      await createNewSubscriptionCommand(userId, selectedPlan)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async subscribe(userId: string, subscribeDto: SubscribeDto) {
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
          await deleteSubscriptionCommand(userId)
          await createNewSubscriptionCommand(userId, selectedPlan)
          return { success: true }
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

  getSubscriptionConfig() {
    try {
      return subscriptionConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async alchemyTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async quicknodeTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.quicknodeGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async createCheckoutSession(selectedPlan: SubscriptionPlans): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: `${selectedPlan.toUpperCase()} Subscription for 30 days`,
              },
              unit_amount: subscriptionConfig.find((item) => item.planName === selectedPlan).price * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: envConfig.nodeEnv === "development" ? "http://localhost:3000/success" : `https://${envConfig.brandName}.vercel.app/success`,
        cancel_url: envConfig.nodeEnv === "development" ? "http://localhost:3000/cancel" : `https://${envConfig.brandName}.vercel.app/cancel`
      })

      return session
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
