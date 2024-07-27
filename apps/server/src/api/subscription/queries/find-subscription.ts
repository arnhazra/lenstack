import { SubscriptionModel } from "../schemas/subscription.schema"

export async function findSubscriptionByUserIdQuery(userId: string) {
  const subscription = await SubscriptionModel.findOne({ userId })
  return subscription
}
