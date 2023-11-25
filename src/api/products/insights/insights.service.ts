import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { InsightsRepository } from "./insights.repository"

@Injectable()
export class InsightsService {
  constructor(private readonly insightsRepository: InsightsRepository) { }

  async createProject(workspaceId: string, createProjectDto: CreateProjectDto) {
    try {
      const { name } = createProjectDto
      const count = await this.insightsRepository.countProjects(workspaceId)

      if (count < 10) {
        const projectId = randomBytes(16).toString("hex")
        const projectPasskey = randomBytes(32).toString("hex")
        const project = await this.insightsRepository.createProject(workspaceId, name, projectId, projectPasskey)
        return project
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getProjects(workspaceId: string, searchQuery: string) {
    try {
      const projects = await this.insightsRepository.getProjectsByWorkspaceId(workspaceId, searchQuery)
      return projects
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewProject(workspaceId: string, projectId: string) {
    try {
      const project = await this.insightsRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project

      if (workspaceIdFromProject.toString() === workspaceId) {
        const analytics = await this.insightsRepository.findAnalyticsByProjectId(workspaceId, project.id)
        return { project, analytics }
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async deleteProject(workspaceId: string, projectId: string) {
    try {
      const project = await this.insightsRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project
      if (workspaceIdFromProject.toString() === workspaceId) {
        await this.insightsRepository.deleteProjectById(workspaceId, projectId)
        return true
      }

      else {
        throw new NotFoundException()
      }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  async createAnalytics(workspaceId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const { component, event, info, statusCode, projectId, projectPasskey } = createAnalyticsDto
      const project = await this.insightsRepository.findProject(projectId, projectPasskey)
      if (project.workspaceId.toString() === workspaceId) {
        const projectId = project.id
        await this.insightsRepository.createAnalytics(workspaceId, projectId, component, event, info, statusCode)
        return true
      }

      else {
        throw new BadRequestException()
      }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
