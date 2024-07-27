import { SubscriptionModel } from "../schemas/subscription.schema"
import { SubscriptionPlans, subscriptionConfig } from "../subscription.config"

export async function createNewSubscriptionCommand(userId: string, selectedPlan: SubscriptionPlans) {
  const remainingCredits = subscriptionConfig.find(plans => plans.planName === selectedPlan).grantedCredits
  const subscription = new SubscriptionModel({ userId, selectedPlan, remainingCredits })
  await subscription.save()
  return subscription
}