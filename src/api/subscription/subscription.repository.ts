import { Injectable } from "@nestjs/common"
import { SubscriptionModel } from "./entities/subscription.entity"
import { UserModel } from "../user/entities/user.entity"

@Injectable()
export class SubscriptionRepository {
  async findUserByApiKey(apiKey: string) {
    const subscription = await SubscriptionModel.findOne({ apiKey })
    const user = await UserModel.findById(subscription.owner)
    return { subscription, user }
  }

  async findSubscriptionByUserIdAndDelete(owner: string) {
    await SubscriptionModel.findOneAndDelete({ owner })
    return true
  }

  async createNewSubscription(owner: string, selectedPlan: string, apiKey: string) {
    const subscription = new SubscriptionModel({ owner, selectedPlan, apiKey })
    await subscription.save()
    return subscription
  }
}
