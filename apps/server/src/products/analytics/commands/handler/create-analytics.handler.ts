import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateAnalyticsCommand } from "../impl/create-analytics.command"
import { AnalyticsFactory } from "../../analytics.factory"

@CommandHandler(CreateAnalyticsCommand)
export class CreateAnalyticsCommandHandler implements ICommandHandler<CreateAnalyticsCommand> {
  constructor(private readonly analyticsFactory: AnalyticsFactory) { }

  async execute(command: CreateAnalyticsCommand) {
    const { orgId, createAnalyticsDto } = command
    await this.analyticsFactory.createOne(orgId, createAnalyticsDto)
    return true
  }
}
