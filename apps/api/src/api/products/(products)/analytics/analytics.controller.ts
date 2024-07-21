import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { AnalyticsService } from "./analytics.service"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("products/analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService, private readonly eventEmitter: EventEmitter2) { }

  @Post("create")
  async createAnalytics(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/analytics", method: "POST", api: "/create" })
      return await this.analyticsService.createAnalytics(user.workspaceId, createAnalyticsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("get")
  async getAnalytics(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/analytics", method: "GET", api: "/get" })
      return await this.analyticsService.getAnalytics(user.workspaceId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
