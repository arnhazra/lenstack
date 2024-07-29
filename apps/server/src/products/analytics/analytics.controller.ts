import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { AnalyticsService } from "./analytics.service"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService, private readonly eventEmitter: EventEmitter2) { }

  @Post("create")
  async createEvent(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createEventsDto: CreateEventsDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/analytics", method: "POST", api: "/create" })
      return await this.analyticsService.createEvent(user.orgId, createEventsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("get")
  async getEvents(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/analytics", method: "GET", api: "/get" })
      return await this.analyticsService.getEvents(user.orgId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
