import { Controller } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { EventsUnion } from "../events.union"
import { MessagePattern } from "@nestjs/microservices"

@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @MessagePattern(EventsUnion.CreateActivity)
  createActivity(createActivityDto: CreateActivityDto) {
    this.activityService.createActivity(createActivityDto)
  }
}
