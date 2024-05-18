import { Controller, Post, Body, Query, BadRequestException, Get } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { statusMessages } from "src/constants/status-messages"

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Post("create")
  async createWorkspace(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = await this.workspaceService.createWorkspace(user.userId, createWorkspaceDto)
      return workspace
    }

    catch (error) {
      throw error
    }
  }

  @Get("findmyworkspaces")
  async findMyWorkspaces(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      const myWorkspaces = await this.workspaceService.findMyWorkspaces(user.userId)
      return { myWorkspaces }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("switch")
  async switchWorkspace(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("workspaceId") workspaceId: string) {
    try {
      return await this.workspaceService.switchWorkspace(user.userId, workspaceId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
