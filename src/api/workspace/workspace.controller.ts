import { Controller, Post, Body, Query, BadRequestException } from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) { }

  @Post("create")
  async createWorkspace(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    try {
      const workspace = await this.workspaceService.createWorkspace(uft.userId, createWorkspaceDto)
      return workspace
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("findmyworkspaces")
  async findMyWorkspaces(@TokenAuthorizer() uft: TokenAuthorizerReturnType) {
    try {
      const myWorkspaces = await this.workspaceService.findMyWorkspaces(uft.userId)
      return { myWorkspaces }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("switch")
  async switchWorkspace(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Query("workspaceId") workspaceId: string) {
    try {
      await this.workspaceService.switchWorkspace(uft.userId, workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
