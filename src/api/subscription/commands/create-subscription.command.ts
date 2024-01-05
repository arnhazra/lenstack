import { subscriptionConfig } from "src/config/subscription.config"
import { SubscriptionModel } from "../models/subscription.model"

export async function createNewSubscriptionCommand(workspaceId: string, selectedPlan: string) {
  const remainingCredits = selectedPlan == "Pro" ? subscriptionConfig.pro.grantedCredits : subscriptionConfig.trial.grantedCredits
  const subscription = new SubscriptionModel({ workspaceId, selectedPlan, remainingCredits })
  await subscription.save()
  return subscription
}