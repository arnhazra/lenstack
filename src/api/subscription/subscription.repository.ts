import { Injectable } from "@nestjs/common"
import { SubscriptionModel } from "./entities/subscription.entity"
import { UserModel } from "../user/entities/user.entity"
import { subscriptionConfig } from "src/config/subscriptionConfig"

@Injectable()
export class SubscriptionRepository {
  async findSubscriptionByWorkspaceIdAndDelete(workspaceId: string) {
    await SubscriptionModel.findOneAndDelete({ workspaceId })
    return true
  }

  async createNewSubscription(workspaceId: string, selectedPlan: string, apiKey: string) {
    const remainingCredits = selectedPlan == "Pro" ? subscriptionConfig.pro.grantedCredits : subscriptionConfig.trial.grantedCredits
    const subscription = new SubscriptionModel({ workspaceId, selectedPlan, apiKey, remainingCredits })
    await subscription.save()
    return subscription
  }
}
