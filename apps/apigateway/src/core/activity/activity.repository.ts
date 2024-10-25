import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Activity } from "./schemas/activity.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class ActivityRepository extends BaseRepository<Activity> {
  constructor(
    @InjectModel(Activity.name, DbConnectionMap.Core)
    private activityModel: Model<Activity>
  ) {
    super(activityModel)
  }

  async findAllItems(searchKeyword: string) {
    const regex = new RegExp(searchKeyword, "i")
    const totalUsage = await this.activityModel
      .find({ apiUri: { $regex: regex } })
      .countDocuments()
    return { totalUsage }
  }
}
