import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, Get } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("products/insights")
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @Get("getanalytics")
  async getAnalytics(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return await this.insightsService.getAnalytics(uft.workspaceId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createanalytics")
  async createAnalytics(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return await this.insightsService.createAnalytics(ufc.workspaceId, createAnalyticsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
