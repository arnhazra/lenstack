import { Injectable, BadRequestException } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateAnalyticsCommand } from "./commands/impl/create-analytics.command"
import { GetAnalyticsQuery } from "./queries/impl/get-analytics.query"

@Injectable()
export class AnalyticsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

  async createAnalytics(workspaceId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return this.commandBus.execute(new CreateAnalyticsCommand(workspaceId, createAnalyticsDto))
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getAnalytics(workspaceId: string) {
    try {
      const analytics = await this.queryBus.execute(new GetAnalyticsQuery(workspaceId))
      return { analytics }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
