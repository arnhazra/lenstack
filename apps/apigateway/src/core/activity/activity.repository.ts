import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Activity } from "./schemas/activity.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "src/infra/database.repository"

@Injectable()
export class ActivityRepository extends BaseRepository<Activity> {
  constructor(@InjectModel(Activity.name, DbConnectionMap.Core) private activityModel: Model<Activity>) {
    super(activityModel)
  }
}
