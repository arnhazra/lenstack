import { SubscriptionModel } from "../schemas/subscription.schema"

export async function deleteSubscriptionCommand(userId: string) {
  await SubscriptionModel.findOneAndDelete({ userId })
  return true
}