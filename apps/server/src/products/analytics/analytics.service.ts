import { Injectable, BadRequestException } from "@nestjs/common"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateAnalyticsCommand } from "./commands/impl/create-analytics.command"
import { GetAnalyticsQuery } from "./queries/impl/get-analytics.query"
import { Analytics } from "./schemas/analytics.schema"

@Injectable()
export class AnalyticsService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

  async createAnalytics(orgId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return await this.commandBus.execute<CreateAnalyticsCommand, Analytics>(new CreateAnalyticsCommand(orgId, createAnalyticsDto))
    }

    catch (error) {
      throw error
    }
  }

  async getAnalytics(orgId: string) {
    try {
      return await this.queryBus.execute<GetAnalyticsQuery, Analytics[]>(new GetAnalyticsQuery(orgId))
    }

    catch (error) {
      throw error
    }
  }
}
