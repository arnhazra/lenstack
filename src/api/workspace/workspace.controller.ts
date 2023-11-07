import { Controller, Post, Body, Delete, Query, BadRequestException } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Post("create")
  async createWorkspace(@TokenAuthorizer() userId: string, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = await this.workspaceService.createWorkspace(userId, createWorkspaceDto)
      return workspace
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("findmyworkspaces")
  async findMyWorkspaces(@TokenAuthorizer() userId: string) {
    try {
      const myWorkspaces = await this.workspaceService.findMyWorkspaces(userId)
      return { myWorkspaces }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Delete("deleteworkspace")
  async removeWorkspace(@TokenAuthorizer() userId: string, @Query("workspaceId") workspaceId: string) {
    try {
      await this.workspaceService.removeWorkspace(userId, workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
