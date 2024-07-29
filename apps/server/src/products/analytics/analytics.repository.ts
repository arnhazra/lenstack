import { Injectable } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { InjectModel, } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { Analytics } from "./schemas/analytics.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Injectable()
export class AnalyticsRepository {
  constructor(@InjectModel(Analytics.name, DbConnectionMap.Analytics) private model: Model<Analytics>) { }

  async createOne(orgId: string, dto: CreateAnalyticsDto) {
    const { component, event, info, statusCode } = dto
    const doc = new this.model({ orgId: new Types.ObjectId(orgId), component, event, info, statusCode })
    await doc.save()
    return doc
  }

  async findAll(orgId: string) {
    const analytics = await this.model.find({ orgId: new Types.ObjectId(orgId) }).sort({ createdAt: -1 })
    return analytics
  }
}