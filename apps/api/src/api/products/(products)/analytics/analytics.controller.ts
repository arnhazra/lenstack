import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { AnalyticsService } from "./analytics.service"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get("get")
  async getAnalytics(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      return await this.analyticsService.getAnalytics(ufc.workspaceId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("create")
  async createAnalytics(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return await this.analyticsService.createAnalytics(ufc.workspaceId, createAnalyticsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
