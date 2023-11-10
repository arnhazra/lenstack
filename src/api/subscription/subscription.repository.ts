import { Injectable } from "@nestjs/common"
import { SubscriptionModel } from "./entities/subscription.entity"
import { subscriptionConfig } from "src/config/subscriptionConfig"

@Injectable()
export class SubscriptionRepository {
  async findSubscriptionByWorkspaceIdAndDelete(workspaceId: string) {
    const subscription = await SubscriptionModel.findOneAndDelete({ workspaceId })
    return subscription
  }

  async createNewSubscription(workspaceId: string, selectedPlan: string, apiKey: string) {
    const remainingCredits = selectedPlan == "Pro" ? subscriptionConfig.pro.grantedCredits : subscriptionConfig.trial.grantedCredits
    const subscription = new SubscriptionModel({ workspaceId, selectedPlan, apiKey, remainingCredits })
    await subscription.save()
    return subscription
  }
}
