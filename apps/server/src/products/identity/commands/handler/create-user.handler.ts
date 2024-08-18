import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { IdentityRepository } from "../../identity.repository"
import { CreateUserCommand } from "../impl/create-user.command"

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: IdentityRepository) { }

  async execute(command: CreateUserCommand) {
    const { email, orgId } = command
    return await this.repository.createOne(email, orgId)
  }
}
