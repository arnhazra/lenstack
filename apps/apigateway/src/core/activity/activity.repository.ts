import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Activity } from "./schemas/activity.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model, Types } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class ActivityRepository extends BaseRepository<Activity> {
  constructor(@InjectModel(Activity.name, DbConnectionMap.Core) private activityModel: Model<Activity>) {
    super(activityModel)
  }

  async findAllItems(userId: string, searchKeyword: string) {
    const regex = new RegExp(searchKeyword, 'i')
    const userUsage = await this.activityModel.find({ userId: new Types.ObjectId(userId), apiUri: { $regex: regex } }).countDocuments()
    const totalUsage = await this.activityModel.find({ apiUri: { $regex: regex } }).countDocuments()
    return { userUsage, totalUsage }
  }
}
