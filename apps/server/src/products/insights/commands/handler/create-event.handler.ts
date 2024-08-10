import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { InsightsRepository } from "../../insights.repository"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly repository: InsightsRepository) { }

  async execute(command: CreateEventsCommand) {
    const { orgId, createEventsDto } = command
    return await this.repository.createOne(orgId, createEventsDto)
  }
}