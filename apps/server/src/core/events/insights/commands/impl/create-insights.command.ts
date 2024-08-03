import { CreateInsightsDto } from "../../dto/create-insights.dto"

export class CreateInsightsCommand {
  constructor(
    public readonly createInsightsDto: CreateInsightsDto
  ) { }
}