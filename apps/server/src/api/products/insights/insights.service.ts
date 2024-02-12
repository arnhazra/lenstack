import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { InsightsRepository } from "./insights.repository"

@Injectable()
export class InsightsService {
  constructor(private readonly insightsRepository: InsightsRepository) { }

  async getAnalytics(workspaceId: string) {
    try {
      const analytics = await this.insightsRepository.findAnalyticsByWorkspaceId(workspaceId)
      return { analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async createAnalytics(workspaceId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const { component, event, info, statusCode } = createAnalyticsDto
      await this.insightsRepository.createAnalytics(workspaceId, component, event, info, statusCode)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
