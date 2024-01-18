import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, Get } from "@nestjs/common"
import { InsightsService } from "./insights.service"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/insights")
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) { }

  @Post("createproject")
  async createProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.insightsService.createProject(uft.workspaceId, createProjectDto)
      return { project }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("getprojects")
  async getProjects(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("searchQuery") searchQuery: string) {
    try {
      const projects = await this.insightsService.getProjects(uft.workspaceId, searchQuery)
      return { projects }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("viewproject")
  async viewProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("projectId") projectId: string) {
    try {
      const { project, analytics } = await this.insightsService.viewProject(uft.workspaceId, projectId)
      return { project, analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteproject")
  async deleteProject(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("projectId") projectId: string) {
    try {
      return await this.insightsService.deleteProject(uft.workspaceId, projectId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createanalytics")
  async createAnalytics(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      return await this.insightsService.createAnalytics(ufc.workspaceId, createAnalyticsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
