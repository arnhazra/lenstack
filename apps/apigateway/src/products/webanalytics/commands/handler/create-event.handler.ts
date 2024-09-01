import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { WebAnalyticsRepository } from "../../webanalytics.repository"
import { Types } from "mongoose"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler implements ICommandHandler<CreateEventsCommand> {
  constructor(private readonly repository: WebAnalyticsRepository) { }

  async execute(command: CreateEventsCommand) {
    const { orgId, createEventsDto } = command
    const { event } = createEventsDto
    return await this.repository.create({ orgId: new Types.ObjectId(orgId), event })
  }
}