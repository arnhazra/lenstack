import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { AnalyticsRepository } from "../../analytics.repository"
import { Events } from "../../schemas/event.schema"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(command: CreateEventsCommand): Promise<Events> {
    const { orgId, createEventsDto } = command
    return await this.repository.createOne(orgId, createEventsDto)
  }
}