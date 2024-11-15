import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { CreateWorkspaceCommand } from "../impl/create-workspace.command"
import { WorkspaceRepository } from "../../workspace.repository"

@CommandHandler(CreateWorkspaceCommand)
export class CreateWorkspaceCommandHandler
  implements ICommandHandler<CreateWorkspaceCommand>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(command: CreateWorkspaceCommand) {
    const { name, userId } = command
    return await this.repository.createOne({ name, userId })
  }
}
