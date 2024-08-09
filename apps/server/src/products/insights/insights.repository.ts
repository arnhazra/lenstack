import { Injectable } from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { InjectModel, } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { Events } from "./schemas/event.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"

@Injectable()
export class InsightsRepository {
  constructor(@InjectModel(Events.name, DbConnectionMap.Insights) private model: Model<Events>) { }

  async createOne(orgId: string, dto: CreateEventsDto): Promise<Events> {
    const { event } = dto
    const doc = new this.model({ orgId: new Types.ObjectId(orgId), event })
    await doc.save()
    return doc
  }

  async findAll(orgId: string): Promise<Events[]> {
    return await this.model.find({ orgId: new Types.ObjectId(orgId) }).sort({ createdAt: -1 })
  }
}