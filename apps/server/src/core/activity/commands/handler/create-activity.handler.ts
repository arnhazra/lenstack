import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { CreateActivityCommand } from "../impl/create-activity.command"
import { ActivityRepository } from "../../activity.repository"

@CommandHandler(CreateActivityCommand)
export class CreateActivityCommandHandler implements ICommandHandler<CreateActivityCommand> {
  constructor(private readonly repository: ActivityRepository) { }

  async execute(command: CreateActivityCommand) {
    return await this.repository.createOne(command.createActivityDto)
  }
}