import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { statusMessages } from "src/constants/status-messages"
import { createWorkspaceCommand } from "./commands/create-workspace.command"
import { findMyWorkspacesQuery } from "./queries/find-workspaces.query"
import { findWorkspaceByIdQuery } from "./queries/find-workspace-by-id.query"
import { switchWorkspaceCommand } from "./commands/switch-workspace.command"

@Injectable()
export class WorkspaceService {

  async createWorkspace(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const { name } = createWorkspaceDto
      const workspace = await createWorkspaceCommand(name, userId)
      return workspace
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyWorkspaces(userId: string) {
    try {
      const workspaces = await findMyWorkspacesQuery(userId)
      return workspaces
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async switchWorkspace(userId: string, workspaceId: string) {
    try {
      const { ownerId } = await findWorkspaceByIdQuery(workspaceId)

      if (ownerId.toString() === userId) {
        await switchWorkspaceCommand(userId, workspaceId)
        return { success: true }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
