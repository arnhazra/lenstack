import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateInsightDto } from './dto/create-insight.dto'
import createInsightsCommand from "./commands/create-insights.command"

@Injectable()
export class InsightsService {
  createInsights(createInsightDto: CreateInsightDto) {
    try {
      createInsightsCommand(createInsightDto)
    }

    catch (error) {
      return false
    }
  }
}
