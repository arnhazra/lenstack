import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Subscription } from "./schemas/subscription.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model, Types } from "mongoose"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Injectable()
export class SubscriptionRepository {
  constructor(@InjectModel(Subscription.name, DbConnectionMap.Core) private model: Model<Subscription>) { }

  @OnEvent(EventsUnion.FindSubscription)
  async findOne(userId: string): Promise<Subscription | null> {
    return await this.model.findOne({ userId })
  }

  async createOne(userId: string, selectedPlan: string, remainingCredits: number): Promise<Subscription | null> {
    return await new this.model({ userId: new Types.ObjectId(userId), selectedPlan, remainingCredits }).save()
  }

  async deleteOne(userId: string): Promise<Subscription | null> {
    return await this.model.findOneAndDelete({ userId })
  }
}
