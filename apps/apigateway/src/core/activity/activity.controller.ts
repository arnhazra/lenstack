import { Controller } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { EventsUnion } from "../../shared/utils/events.union"
import { OnEvent } from "@nestjs/event-emitter"

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @OnEvent(EventsUnion.CreateActivity)
  createActivity(createActivityDto: CreateActivityDto) {
    this.activityService.createActivity(createActivityDto)
  }
}
