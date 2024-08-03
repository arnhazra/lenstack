import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UserRepository } from "../../user.repository"
import { CreateUserCommand } from "../impl/create-user.command"
import { User } from "../../schemas/user.schema"

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) { }

  async execute(command: CreateUserCommand): Promise<User> {
    const { email } = command
    return await this.repository.createOne(email)
  }
}
