import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { FrostlakeRepository } from "./frostlake.repository"

@Injectable()
export class FrostlakeService {
  constructor(private readonly frostlakeRepository: FrostlakeRepository) { }

  async createProject(workspaceId: string, createProjectDto: CreateProjectDto) {
    try {
      const { name } = createProjectDto
      const count = await this.frostlakeRepository.countProjects(workspaceId)

      if (count < 10) {
        const clientId = randomBytes(16).toString("hex")
        const clientSecret = randomBytes(32).toString("hex")
        const project = await this.frostlakeRepository.createProject(workspaceId, name, clientId, clientSecret)
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

  async getProjects(workspaceId: string) {
    try {
      const projects = await this.frostlakeRepository.getProjectsByUserId(workspaceId)
      return projects
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewProject(workspaceId: string, projectId: string) {
    try {
      const project = await this.frostlakeRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project

      if (workspaceIdFromProject.toString() === workspaceId) {
        const analytics = await this.frostlakeRepository.findAnalyticsByProjectId(workspaceId, project.id)
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
      const project = await this.frostlakeRepository.findProjectById(projectId)
      const { workspaceId: workspaceIdFromProject } = project
      if (workspaceIdFromProject.toString() === workspaceId) {
        await this.frostlakeRepository.deleteProjectById(workspaceId, projectId)
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
      const { component, event, info, statusCode, clientId, clientSecret } = createAnalyticsDto
      const project = await this.frostlakeRepository.findProject(clientId, clientSecret)
      if (project.workspaceId.toString() === workspaceId) {
        const projectId = project.id
        await this.frostlakeRepository.createAnalytics(workspaceId, projectId, component, event, info, statusCode)
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
