import { CreateAnalyticsDto } from "../../dto/create-analytics.dto"

export class CreateAnalyticsCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly createAnalyticsDto: CreateAnalyticsDto
  ) { }
}