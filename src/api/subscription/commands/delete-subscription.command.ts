import { SubscriptionModel } from "../models/subscription.model"

export async function deleteSubscriptionCommand(workspaceId: string) {
  const subscription = await SubscriptionModel.findOneAndDelete({ workspaceId })
  return subscription
}