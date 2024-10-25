import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { WebAnalyticsService } from "./webanalytics.service"
import { CredentialGuard } from "src/shared/auth/credential.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"

@Controller("products/webanalytics")
export class WebAnalyticsController {
  constructor(private readonly webanalyticsService: WebAnalyticsService) {}

  @UseGuards(CredentialGuard)
  @Post("create")
  async createEvent(
    @Request() request: ModRequest,
    @Body() createEventsDto: CreateEventsDto
  ) {
    try {
      return await this.webanalyticsService.createEvent(
        request.user.orgId,
        createEventsDto
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(CredentialGuard)
  @Get("get")
  async getEvents(@Request() request: ModRequest) {
    try {
      return await this.webanalyticsService.getEvents(request.user.orgId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
