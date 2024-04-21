import { SubscriptionModel } from "../models/subscription.model"

export async function deleteSubscriptionCommand(userId: string) {
  await SubscriptionModel.findOneAndDelete({ userId })
  return true
}