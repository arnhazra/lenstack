import { Injectable } from "@nestjs/common"
import { MasterSubscriptionModel } from "./entities/subscription.entity"
import { MasterUserModel } from "../user/entities/user.entity"

@Injectable()
export class SubscriptionRepository {
  async findUserByApiKey(apiKey: string) {
    const subscription = await MasterSubscriptionModel.findOne({ apiKey })
    const user = await MasterUserModel.findById(subscription.owner)
    return { subscription, user }
  }

  async findSubscriptionByUserIdAndDelete(owner: string) {
    await MasterSubscriptionModel.findOneAndDelete({ owner })
    return true
  }

  async createNewSubscription(owner: string, selectedPlan: string, apiKey: string, tokenId: string) {
    const subscription = new MasterSubscriptionModel({ owner, selectedPlan, apiKey, tokenId })
    await subscription.save()
    return subscription
  }
}
