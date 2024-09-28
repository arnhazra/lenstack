import { Controller, Post, UseGuards, Request, BadRequestException, Body } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { EventsUnion } from "../../shared/utils/events.union"
import { OnEvent } from "@nestjs/event-emitter"
import { GetCountDto } from "./dto/get-count.dto"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @OnEvent(EventsUnion.CreateActivity)
  createActivity(createActivityDto: CreateActivityDto) {
    this.activityService.createActivity(createActivityDto)
  }

  @UseGuards(TokenGuard)
  @Post("search")
  async getActivityCount(@Body() getCountDto: GetCountDto, @Request() request: ModRequest) {
    try {
      return await this.activityService.getActivityCount(getCountDto, request.user.userId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
