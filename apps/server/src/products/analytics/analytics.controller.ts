import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { AnalyticsService } from "./analytics.service"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Post("create")
  async createEvent(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createEventsDto: CreateEventsDto) {
    try {
      return await this.analyticsService.createEvent(user.orgId, createEventsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("get")
  async getEvents(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      return await this.analyticsService.getEvents(user.orgId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
