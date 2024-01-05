import { SubscriptionModel } from "../models/subscription.model"

export async function findSubscriptionByWorkspaceIdQuery(workspaceId: string) {
  const subscription = await SubscriptionModel.findOne({ workspaceId })
  return subscription
}
