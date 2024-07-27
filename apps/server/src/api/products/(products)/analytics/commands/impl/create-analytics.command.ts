import { CreateAnalyticsDto } from "../../dto/create-analytics.dto"

export class CreateAnalyticsCommand {
  constructor(
    public readonly orgId: string,
    public readonly createAnalyticsDto: CreateAnalyticsDto
  ) { }
}