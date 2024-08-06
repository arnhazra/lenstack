import { Injectable } from "@nestjs/common"
import { CreateInsightsDto } from "./dto/create-insights.dto"
import { CommandBus } from "@nestjs/cqrs"
import { CreateInsightsCommand } from "./commands/impl/create-insights.command"
import { Insights } from "./schemas/insights.schema"

@Injectable()
export class InsightsService {
  constructor(private readonly commandBus: CommandBus) { }
  createInsights(createInsightsDto: CreateInsightsDto) {
    try {
      this.commandBus.execute<CreateInsightsCommand, Insights>(new CreateInsightsCommand(createInsightsDto))
    }

    catch (error) {
      return false
    }
  }
}
