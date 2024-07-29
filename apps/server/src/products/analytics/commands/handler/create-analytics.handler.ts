import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateAnalyticsCommand } from "../impl/create-analytics.command"
import { AnalyticsRepository } from "../../analytics.repository"
import { Analytics } from "../../schemas/analytics.schema"

@CommandHandler(CreateAnalyticsCommand)
export class CreateAnalyticsCommandHandler implements ICommandHandler<CreateAnalyticsCommand> {
  constructor(private readonly repository: AnalyticsRepository) { }

  async execute(command: CreateAnalyticsCommand): Promise<Analytics> {
    const { orgId, createAnalyticsDto } = command
    return await this.repository.createOne(orgId, createAnalyticsDto)
  }
}