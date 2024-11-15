import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Subscription } from "./schemas/subscription.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor(
    @InjectModel(Subscription.name, DbConnectionMap.Core)
    private subscriptionModel: Model<Subscription>
  ) {
    super(subscriptionModel)
  }
}
