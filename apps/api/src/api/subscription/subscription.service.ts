import Stripe from "stripe"
import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { envConfig } from "src/env.config"
import { SubscriptionPlans, subscriptionConfig } from "./subscription.config"
import { createNewSubscriptionCommand } from "./commands/create-subscription.command"
import { deleteSubscriptionCommand } from "./commands/delete-subscription.command"
import { otherConstants } from "src/constants/other-constants"
import { findUserByIdQuery } from "../user/queries/find-user-by-id"
import { updateTrialStatus } from "../user/commands/update-trial-status.command"

@Injectable()
export class SubscriptionService {
  private readonly stripe: Stripe

  constructor() {
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
      if (session.metadata.selectedPlan as SubscriptionPlans === SubscriptionPlans.Pro) {
        await deleteSubscriptionCommand(session.metadata.userId)
        await createNewSubscriptionCommand(session.metadata.userId, session.metadata.selectedPlan as SubscriptionPlans)
        return { success: true }
      }

      else {
        const user = await findUserByIdQuery(session.metadata.userId)

        if (user.isTrialAvailable) {
          await deleteSubscriptionCommand(session.metadata.userId)
          await createNewSubscriptionCommand(session.metadata.userId, session.metadata.selectedPlan as SubscriptionPlans)
          await updateTrialStatus(session.metadata.userId)
          return { success: true }
        }

        else {
          throw new BadRequestException(statusMessages.connectionError)
        }
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
