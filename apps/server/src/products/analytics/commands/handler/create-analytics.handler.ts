import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateAnalyticsCommand } from "../impl/create-analytics.command"
import { AnalyticsRepository } from "../../analytics.repository"

@CommandHandler(CreateAnalyticsCommand)
export class CreateAnalyticsCommandHandler implements ICommandHandler<CreateAnalyticsCommand> {
  constructor(private readonly analyticsRepository: AnalyticsRepository) { }

  async execute(command: CreateAnalyticsCommand) {
    const { orgId, createAnalyticsDto } = command
    await this.analyticsRepository.createOne(orgId, createAnalyticsDto)
    return true
  }
}
