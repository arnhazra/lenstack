import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { AnalyticsRepository } from "../../analytics.repository"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(command: CreateEventsCommand) {
    const { orgId, createEventsDto } = command
    return await this.repository.createOne(orgId, createEventsDto)
  }
}