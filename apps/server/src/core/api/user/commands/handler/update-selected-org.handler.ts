import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { UpdateSelectedOrgCommand } from "../impl/update-selected-org.command"
import { User } from "../../schemas/user.schema"
import { Types } from "mongoose"

@CommandHandler(UpdateSelectedOrgCommand)
export class UpdateSelectedOrgCommandHandler implements ICommandHandler<UpdateSelectedOrgCommand> {
  constructor(private readonly repository: UserRepository) { }

  async execute(command: UpdateSelectedOrgCommand): Promise<User> {
    const { id, orgId } = command
    return await this.repository.updateOneById(id, "selectedOrgId", new Types.ObjectId(orgId))
  }
}
