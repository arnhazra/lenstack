import { Controller, Post, Body, Query, BadRequestException, Get } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { statusMessages } from "src/constants/status-messages"

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Post("create")
  async createWorkspace(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = await this.workspaceService.createWorkspace(uft.userId, createWorkspaceDto)
      return workspace
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Get("findmyworkspaces")
  async findMyWorkspaces(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const myWorkspaces = await this.workspaceService.findMyWorkspaces(uft.userId)
      return { myWorkspaces }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("switch")
  async switchWorkspace(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("workspaceId") workspaceId: string) {
    try {
      await this.workspaceService.switchWorkspace(uft.userId, workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
