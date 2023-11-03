import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { FrostlakeService } from "./frostlake.service"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("frostlake")
export class FrostlakeController {
  constructor(private readonly frostlakeService: FrostlakeService) { }

  @Post("createproject")
  async createProject(@TokenAuthorizer() userId: string, @Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.frostlakeService.createProject(userId, createProjectDto)
      return { project }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getprojects")
  async getProjects(@TokenAuthorizer() userId: string) {
    try {
      const projects = await this.frostlakeService.getProjects(userId)
      return { projects }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewproject")
  async viewProject(@TokenAuthorizer() userId: string, @Body("projectId") projectId: string) {
    try {
      const { project, analytics } = await this.frostlakeService.viewProject(userId, projectId)
      return { project, analytics }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deleteproject")
  async deleteProject(@TokenAuthorizer() userId: string, @Query("projectId") projectId: string) {
    try {
      await this.frostlakeService.deleteProject(userId, projectId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createanalytics")
  async createAnalytics(@ApiKeyAuthorizer() userId: string, @Body() createAnalyticsDto: CreateAnalyticsDto) {
    try {
      await this.frostlakeService.createAnalytics(userId, createAnalyticsDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
