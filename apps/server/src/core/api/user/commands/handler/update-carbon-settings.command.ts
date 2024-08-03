import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { UpdateCarbonSettingsCommand } from "../impl/update-carbon-settings.command"
import { User } from "../../schemas/user.schema"

@CommandHandler(UpdateCarbonSettingsCommand)
export class UpdateCarbonSettingsCommandHandler implements ICommandHandler<UpdateCarbonSettingsCommand> {
  constructor(private readonly repository: UserRepository) { }

  async execute(command: UpdateCarbonSettingsCommand): Promise<User> {
    const { id, reduceCarbonEmissions } = command
    return await this.repository.updateOneById(id, "reduceCarbonEmissions", reduceCarbonEmissions)
  }
}
