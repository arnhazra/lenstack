import { Controller, Post, Body } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { CreateInsightDto } from "./dto/create-insight.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "../events.union"

@Controller("insights")
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @OnEvent(EventsUnion.CreateInsights)
  createInsights(createInsightDto: CreateInsightDto) {
    this.insightsService.createInsights(createInsightDto)
  }
}
