import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateAnalyticsCommand } from "../impl/create-analytics.command"
import { AnalyticsRepository } from "../../analytics.repository"

@CommandHandler(CreateAnalyticsCommand)
export class CreateAnalyticsCommandHandler implements ICommandHandler<CreateAnalyticsCommand> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(command: CreateAnalyticsCommand) {
    const { workspaceId, createAnalyticsDto } = command
    await this.repository.createOne(workspaceId, createAnalyticsDto)
    return true
  }
}
