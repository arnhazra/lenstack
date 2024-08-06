import Stripe from "stripe"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/utils/constants/status-messages"
import { envConfig } from "src/env.config"
import { CreditType, SubscriptionPlans, subscriptionConfig } from "./subscription.config"
import { otherConstants } from "src/utils/constants/other-constants"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateSubscriptionCommand } from "./commands/impl/create-subscription.command"
import { DeleteSubscriptionCommand } from "./commands/impl/delete-subscription.command"

@Injectable()
export class SubscriptionService {
  private readonly stripe: Stripe

  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {
    this.stripe = new Stripe(envConfig.stripeSecretKey)
  }

  getSubscriptionConfig() {
    try {
      return subscriptionConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createCheckoutSession(selectedPlan: SubscriptionPlans, userId: string): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: `${selectedPlan.toUpperCase()} Subscription for 30 days`,
              },
              unit_amount: subscriptionConfig.find((item) => item.planName === selectedPlan).price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: envConfig.nodeEnv === "development" ?
          `${otherConstants.stripeConfigBaseUriDev}/subscribe?session_id={CHECKOUT_SESSION_ID}` :
          `${otherConstants.stripeConfigBaseUriProd}/subscribe?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: envConfig.nodeEnv === "development" ?
          `${otherConstants.stripeConfigBaseUriDev}/cancel` :
          `${otherConstants.stripeConfigBaseUriProd}/cancel`,
        metadata: {
          userId, selectedPlan
        }
      })

      return session
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async subscribe(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
      await this.commandBus.execute(new DeleteSubscriptionCommand(session.metadata.userId))
      await this.commandBus.execute(new CreateSubscriptionCommand(session.metadata.userId, session.metadata.selectedPlan as SubscriptionPlans))
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
