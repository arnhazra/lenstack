import { ICommandHandler, CommandHandler } from "@nestjs/cqrs"
import { DeleteWorkspaceCommand } from "../impl/delete-workspace.command"
import { WorkspaceRepository } from "../../workspace.repository"
import objectId from "src/shared/utils/convert-objectid"

@CommandHandler(DeleteWorkspaceCommand)
export class DeleteWorkspaceCommandHandler
  implements ICommandHandler<DeleteWorkspaceCommand>
{
  constructor(private readonly repository: WorkspaceRepository) {}

  async execute(command: DeleteWorkspaceCommand) {
    const { workspaceId } = command
    return await this.repository.deleteById(objectId(workspaceId))
  }
}
