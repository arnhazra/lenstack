import { Injectable } from "@nestjs/common"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { InjectModel } from "@nestjs/mongoose"
import { Activity } from "./schemas/activity.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model, Types } from "mongoose"

@Injectable()
export class ActivityRepository {
  constructor(@InjectModel(Activity.name, DbConnectionMap.Core) private model: Model<Activity>) { }

  async createOne(createActivityDto: CreateActivityDto): Promise<Activity | null> {
    const { apiUri, method, userId } = createActivityDto
    return await new this.model({ apiUri, method, userId: new Types.ObjectId(userId) }).save()
  }
}
