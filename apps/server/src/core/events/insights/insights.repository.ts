import { Injectable } from "@nestjs/common"
import { CreateInsightsDto } from "./dto/create-insights.dto"
import { InjectModel } from "@nestjs/mongoose"
import { Insights } from "./schemas/insights.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"

@Injectable()
export class InsightsRepository {
  constructor(@InjectModel(Insights.name, DbConnectionMap.Core) private model: Model<Insights>) { }

  async createInsights(createInsightsDto: CreateInsightsDto): Promise<Insights | null> {
    const { apiUri, method, userId } = createInsightsDto
    return await new this.model({ apiUri, method, userId }).save()
  }
}
