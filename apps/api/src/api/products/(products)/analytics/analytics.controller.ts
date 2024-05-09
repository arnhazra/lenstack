import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { AnalyticsService } from "./analytics.service"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get("get")
  async getAnalytics(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      return await this.analyticsService.getAnalytics(user.workspaceId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("create")
  async createAnalytics(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return await this.analyticsService.createAnalytics(user.workspaceId, createAnalyticsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
