import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateEventsCommand } from "../impl/create-events.command"
import { WebAnalyticsRepository } from "../../webanalytics.repository"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(CreateEventsCommand)
export class CreateEventsCommandHandler
  implements ICommandHandler<CreateEventsCommand>
{
  constructor(private readonly repository: WebAnalyticsRepository) {}

  async execute(command: CreateEventsCommand) {
    const { workspaceId, createEventsDto } = command
    const { event } = createEventsDto
    return await this.repository.create({
      workspaceId: objectId(workspaceId),
      event,
    })
  }
}
