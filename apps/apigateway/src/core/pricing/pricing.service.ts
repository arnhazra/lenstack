import Stripe from "stripe"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { envConfig } from "src/env.config"
import { pricingConfig } from "./pricing.config"
import { otherConstants } from "src/shared/utils/constants/other-constants"
import { User } from "../user/schemas/user.schema"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"

@Injectable()
export class PricingService {
  private readonly stripe: Stripe

  constructor(private readonly eventEmitter: EventEmitter2) {
    this.stripe = new Stripe(envConfig.stripeSecretKey)
  }

  getPricingConfig() {
    try {
      return pricingConfig
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createCheckoutSession(
    amount: number,
    userId: string
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: envConfig.brandName + "Wallet",
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          envConfig.nodeEnv === "development"
            ? `${otherConstants.stripeConfigBaseUriDev}/subscribe?session_id={CHECKOUT_SESSION_ID}`
            : `${otherConstants.stripeConfigBaseUriProd}/subscribe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:
          envConfig.nodeEnv === "development"
            ? `${otherConstants.stripeConfigBaseUriDev}/cancel`
            : `${otherConstants.stripeConfigBaseUriProd}/cancel`,
        metadata: {
          userId,
          amount,
        },
      })

      return session
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async subscribe(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      const { userId, amount } = session.metadata
      const userResponse: User[] = await this.eventEmitter.emitAsync(
        EventsUnion.GetUserDetails,
        { _id: userId }
      )
      const user = userResponse[0]
      const walletBalance = user.walletBalance + Number(amount)
      await this.eventEmitter.emitAsync(
        EventsUnion.UpdateUserDetails,
        userId,
        "walletBalance",
        walletBalance
      )
      return { success: true }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
