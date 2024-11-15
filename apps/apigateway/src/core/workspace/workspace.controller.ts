import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Delete,
  UseGuards,
  Request,
  Param,
  Patch,
} from "@nestjs/common"
import { WorkspaceService } from "./workspace.service"
import { CreateWorkspaceDto } from "./dto/create-workspace.dto"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { TokenGuard } from "src/shared/auth/token.guard"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"

@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @UseGuards(TokenGuard)
  @Post()
  async createWorkspace(
    @Request() request: ModRequest,
    @Body() createWorkspaceDto: CreateWorkspaceDto
  ) {
    try {
      return await this.workspaceService.createWorkspace(
        request.user.userId,
        createWorkspaceDto
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Get()
  async findMyWorkspaces(@Request() request: ModRequest) {
    try {
      return await this.workspaceService.findMyWorkspaces(request.user.userId)
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Delete("/:workspaceId")
  async deleteWorkspace(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.workspaceService.deleteWorkspace(
        request.user.userId,
        params.workspaceId
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Patch("/:workspaceId")
  async updateAttribute(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.workspaceService.updateAttribute(
        request.user.userId,
        params.workspaceId
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
