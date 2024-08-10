import { Injectable } from "@nestjs/common"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { CommandBus } from "@nestjs/cqrs"
import { CreateActivityCommand } from "./commands/impl/create-activity.command"
import { Activity } from "./schemas/activity.schema"

@Injectable()
export class ActivityService {
  constructor(private readonly commandBus: CommandBus) { }

  createActivity(createActivityDto: CreateActivityDto) {
    try {
      this.commandBus.execute<CreateActivityCommand, Activity>(new CreateActivityCommand(createActivityDto))
    }

    catch (error) {
      return false
    }
  }
}
