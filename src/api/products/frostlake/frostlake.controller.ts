import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { FrostlakeService } from "./frostlake.service"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { SearchProjectsDto } from "./dto/search-projects.dto"
import { viewProjectDto } from "./dto/view-project.dto"

@Controller("products/frostlake")
export class FrostlakeController {
  constructor(private readonly frostlakeService: FrostlakeService) { }

  @Post("createproject")
  async createProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.frostlakeService.createProject(uft.workspaceId, createProjectDto)
      return { project }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getprojects")
  async getProjects(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchProjectsDto: SearchProjectsDto) {
    try {
      const { searchQuery } = searchProjectsDto
      const projects = await this.frostlakeService.getProjects(uft.workspaceId, searchQuery)
      return { projects }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewproject")
  async viewProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() viewProjectDto: viewProjectDto) {
    try {
      const { projectId } = viewProjectDto
      const { project, analytics } = await this.frostlakeService.viewProject(uft.workspaceId, projectId)
      return { project, analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteproject")
  async deleteProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("projectId") projectId: string) {
    try {
      await this.frostlakeService.deleteProject(uft.workspaceId, projectId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createanalytics")
  async createAnalytics(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      await this.frostlakeService.createAnalytics(ufak.workspaceId, createAnalyticsDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
