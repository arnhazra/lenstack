import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Subscription } from "./schemas/subscription.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Injectable()
export class SubscriptionRepository {
  constructor(@InjectModel(Subscription.name, DbConnectionMap.Core) private model: Model<Subscription>) { }

  @OnEvent(EventsUnion.FindSubscription)
  async findOne(userId: string) {
    return await this.model.findOne({ userId })
  }

  async createOne(userId: string, selectedPlan: string, remainingCredits: number) {
    return await new this.model({ userId, selectedPlan, remainingCredits }).save()
  }

  async deleteOne(userId: string) {
    return await this.model.findOneAndDelete({ userId })
  }
}
