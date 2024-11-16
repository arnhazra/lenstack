import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Events } from "./schemas/event.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { BaseRepository } from "src/shared/database/database.repository"
import objectId from "src/shared/utils/convert-objectid"

@Injectable()
export class WebAnalyticsRepository extends BaseRepository<Events> {
  constructor(
    @InjectModel(Events.name, DbConnectionMap.WebAnalytics)
    private eventsModel: Model<Events>
  ) {
    super(eventsModel)
  }

  async find(workspaceId: string): Promise<Events[]> {
    return await this.eventsModel
      .find({ workspaceId: objectId(workspaceId) })
      .sort({ createdAt: -1 })
  }
}
