import { SubscriptionModel } from "../models/subscription.model"

export async function deleteSubscriptionCommand(ownerId: string) {
  const subscription = await SubscriptionModel.findOneAndDelete({ ownerId })
  return subscription
}