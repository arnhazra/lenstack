import { Injectable } from '@nestjs/common'
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { AnalyticsModel } from "./schemas/analytics.schema"

@Injectable()
export class AnalyticsRepository {
  async createOne(orgId: string, dto: CreateAnalyticsDto) {
    const { component, event, info, statusCode } = dto
    const doc = new AnalyticsModel({ orgId, component, event, info, statusCode })
    await doc.save()
    return doc
  }

  async findAll(orgId: string) {
    const analytics = await AnalyticsModel.find({ orgId }).sort({ createdAt: -1 })
    return analytics
  }
}