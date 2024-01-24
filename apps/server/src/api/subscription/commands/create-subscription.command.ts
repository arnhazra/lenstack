import { SubscriptionPlans, subscriptionConfig } from "../subscription.config"
import { SubscriptionModel } from "../models/subscription.model"

export async function createNewSubscriptionCommand(workspaceId: string, selectedPlan: SubscriptionPlans) {
  const remainingCredits = subscriptionConfig.find(plans => plans.planName === selectedPlan).grantedCredits
  const subscription = new SubscriptionModel({ workspaceId, selectedPlan, remainingCredits })
  await subscription.save()
  return subscription
}