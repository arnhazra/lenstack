import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateActivityDto } from "./dto/create-activity.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateActivityCommand } from "./commands/impl/create-activity.command"
import { Activity } from "./schemas/activity.schema"
import { GetCountDto } from "./dto/get-count.dto"
import { GetActivityQuery } from "./queries/impl/get-activity-count.query"

@Injectable()
export class ActivityService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  createActivity(createActivityDto: CreateActivityDto) {
    try {
      this.commandBus.execute<CreateActivityCommand, Activity>(
        new CreateActivityCommand(createActivityDto)
      )
    } catch (error) {
      return false
    }
  }

  async getActivityCount(getCountDto: GetCountDto) {
    try {
      return this.queryBus.execute<GetActivityQuery, { totalUsage: number }>(
        new GetActivityQuery(getCountDto)
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
