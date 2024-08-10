import { Controller } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { EventsUnion } from "../events.union"

@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @OnEvent(EventsUnion.CreateActivity)
  createActivity(createActivityDto: CreateActivityDto) {
    this.activityService.createActivity(createActivityDto)
  }
}
