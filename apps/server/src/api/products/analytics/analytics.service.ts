import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { createAnalyticsCommand } from "./commands/create-analytics.command"
import { getAnalyticsByWorkspaceIdQuery } from "./queries/get-analytics.query"

@Injectable()
export class AnalyticsService {
  async getAnalytics(workspaceId: string) {
    try {
      const analytics = await getAnalyticsByWorkspaceIdQuery(workspaceId)
      return { analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async createAnalytics(workspaceId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      await createAnalyticsCommand(workspaceId, createAnalyticsDto)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
