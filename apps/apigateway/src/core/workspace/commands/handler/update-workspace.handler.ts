import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { UpdateWorkspaceCommand } from "../impl/update-workspace.command"
import { WorkspaceRepository } from "../../workspace.repository"

@CommandHandler(UpdateWorkspaceCommand)
export class UpdateWorkspaceCommandHandler
  implements ICommandHandler<UpdateWorkspaceCommand>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(command: UpdateWorkspaceCommand) {
    const { userId, workspaceId } = command
    return await this.repository.updateById(userId, workspaceId)
  }
}
