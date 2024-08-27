import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { WebAnalyticsRepository } from "../../webanalytics.repository"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly repository: WebAnalyticsRepository) { }

  async execute(command: CreateEventsCommand) {
    const { orgId, createEventsDto } = command
    return await this.repository.createOne(orgId, createEventsDto)
  }
}