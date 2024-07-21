import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { AnalyticsModel } from "./schemas/analytics.schema"

@Injectable()
export class AnalyticsRepository {
  async createOne(workspaceId: string, dto: CreateAnalyticsDto) {
    const { component, event, info, statusCode } = dto
    const doc = new AnalyticsModel({ workspaceId, component, event, info, statusCode })
    await doc.save()
    return doc
  }

  async findAll(workspaceId: string) {
    const analytics = await AnalyticsModel.find({ workspaceId })
    return analytics
  }
}