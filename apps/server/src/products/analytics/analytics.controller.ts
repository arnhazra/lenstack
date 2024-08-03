import { Controller, Post, Body, BadRequestException, Get, UseGuards, Request } from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { AnalyticsService } from "./analytics.service"
import { CredentialGuard } from "src/auth/credential.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @UseGuards(CredentialGuard)
  @Post("create")
  async createEvent(@Request() request: ModRequest, @Body() createEventsDto: CreateEventsDto) {
    try {
      return await this.analyticsService.createEvent(request.user.orgId, createEventsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(CredentialGuard)
  @Get("get")
  async getEvents(@Request() request: ModRequest) {
    try {
      return await this.analyticsService.getEvents(request.user.orgId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
