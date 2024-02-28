import { SubscriptionModel } from "../models/subscription.model"

export async function deleteSubscriptionCommand(userId: string) {
  const subscription = await SubscriptionModel.findOneAndDelete({ userId })
  return subscription
}