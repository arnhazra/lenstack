import { Controller } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { CreateInsightsDto } from "./dto/create-insights.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "../events.union"

@Controller("insights")
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @OnEvent(EventsUnion.CreateInsights)
  createInsights(createInsightsDto: CreateInsightsDto) {
    this.insightsService.createInsights(createInsightsDto)
  }
}
