import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindAllWorkspaceQuery } from "./queries/impl/find-all-workspaces.query"
import { FindWorkspaceByIdQuery } from "./queries/impl/find-workspace-by-id.query"
import { Workspace } from "./schemas/workspace.schema"
import { DeleteWorkspaceCommand } from "./commands/impl/delete-workspace.command"
import { CreateWorkspaceCommand } from "./commands/impl/create-workspace.command"
import { UpdateWorkspaceCommand } from "./commands/impl/update-workspace.command"

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async createWorkspace(
    userId: string,
    createWorkspaceDto: CreateWorkspaceDto
  ) {
    try {
      const { name } = createWorkspaceDto
      return await this.commandBus.execute<CreateWorkspaceCommand, Workspace>(
        new CreateWorkspaceCommand(name, userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async findMyWorkspaces(userId: string) {
    try {
      return await this.queryBus.execute<FindAllWorkspaceQuery, Workspace[]>(
        new FindAllWorkspaceQuery(userId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async deleteWorkspace(reqUserId: string, workspaceId: string) {
    try {
      const { userId } = await this.queryBus.execute<
        FindWorkspaceByIdQuery,
        Workspace
      >(new FindWorkspaceByIdQuery(workspaceId))

      if (userId.toString() === reqUserId) {
        await this.commandBus.execute(new DeleteWorkspaceCommand(workspaceId))
        return { success: true }
      } else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateAttribute(userId: string, workspaceId: string) {
    try {
      await this.commandBus.execute<UpdateWorkspaceCommand, Workspace>(
        new UpdateWorkspaceCommand(userId, workspaceId)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
