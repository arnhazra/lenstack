import { Injectable } from "@nestjs/common"
import { CreateEventsDto } from "./dto/create-events.dto"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { CreateEventsCommand } from "./commands/impl/create-events.command"
import { GetEventsQuery } from "./queries/impl/get-events.query"
import { Events } from "./schemas/event.schema"

@Injectable()
export class WebAnalyticsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async createEvent(workspaceId: string, createEventsDto: CreateEventsDto) {
    try {
      return await this.commandBus.execute<CreateEventsCommand, Events>(
        new CreateEventsCommand(workspaceId, createEventsDto)
      )
    } catch (error) {
      throw error
    }
  }

  async getEvents(workspaceId: string) {
    try {
      return await this.queryBus.execute<GetEventsQuery, Events[]>(
        new GetEventsQuery(workspaceId)
      )
    } catch (error) {
      throw error
    }
  }
}
