import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { Events } from "./schemas/event.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class WebAnalyticsRepository extends BaseRepository<Events> {
  constructor(@InjectModel(Events.name, DbConnectionMap.WebAnalytics) private eventsModel: Model<Events>) {
    super(eventsModel)
  }

  async find(orgId: string): Promise<Events[]> {
    return await this.eventsModel.find({ orgId: new Types.ObjectId(orgId) }).sort({ createdAt: -1 })
  }
}