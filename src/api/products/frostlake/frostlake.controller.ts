import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { FrostlakeService } from "./frostlake.service"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerReturnType } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("frostlake")
export class FrostlakeController {
  constructor(private readonly frostlakeService: FrostlakeService) { }

  @Post("createproject")
  async createProject(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.frostlakeService.createProject(uft.workspaceId, createProjectDto)
      return { project }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getprojects")
  async getProjects(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("searchQuery") searchQuery: string) {
    try {
      const projects = await this.frostlakeService.getProjects(uft.workspaceId, searchQuery)
      return { projects }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewproject")
  async viewProject(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("projectId") projectId: string) {
    try {
      const { project, analytics } = await this.frostlakeService.viewProject(uft.workspaceId, projectId)
      return { project, analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteproject")
  async deleteProject(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Query("projectId") projectId: string) {
    try {
      await this.frostlakeService.deleteProject(uft.workspaceId, projectId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createanalytics")
  async createAnalytics(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      await this.frostlakeService.createAnalytics(ufak.workspaceId, createAnalyticsDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
