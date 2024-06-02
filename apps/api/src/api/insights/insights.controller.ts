import { Controller, Post, Body } from '@nestjs/common'
import { InsightsService } from './insights.service'
import { CreateInsightDto } from './dto/create-insight.dto'
import { OnEvent } from "@nestjs/event-emitter"

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @OnEvent("createInsights")
  createInsights(createInsightDto: CreateInsightDto) {
    this.insightsService.createInsights(createInsightDto)
  }
}
