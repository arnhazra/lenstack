import { SubscriptionModel } from "../models/subscription.model"

export async function findSubscriptionByUserIdQuery(userId: string) {
  const subscription = await SubscriptionModel.findOne({ ownerId: userId })
  return subscription
}
