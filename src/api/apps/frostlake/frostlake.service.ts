import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common"
import { randomBytes } from "crypto"
import { CreateAnalyticsDto } from "./dto/create-analytics.dto"
import { CreateProjectDto } from "./dto/create-project.dto"
import { FrostlakeRepository } from "./frostlake.repository"

@Injectable()
export class FrostlakeService {
  constructor(private readonly frostlakeRepository: FrostlakeRepository) { }

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    try {
      const { name } = createProjectDto
      const count = await this.frostlakeRepository.countProjects(userId)

      if (count < 10) {
        const clientId = randomBytes(16).toString("hex")
        const clientSecret = randomBytes(32).toString("hex")
        const project = await this.frostlakeRepository.createProject(userId, name, clientId, clientSecret)
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

  async getProjects(userId: string) {
    try {
      const projects = await this.frostlakeRepository.getProjectsByUserId(userId)
      return projects
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewProject(userId: string, projectId: string) {
    try {
      const project = await this.frostlakeRepository.findProjectById(projectId)
      const { owner } = project

      if (owner.toString() === userId) {
        const analytics = await this.frostlakeRepository.findAnalyticsByProjectId(userId, project.id)
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

  async deleteProject(userId: string, projectId: string) {
    try {
      const project = await this.frostlakeRepository.findProjectById(projectId)
      const { owner } = project
      if (owner.toString() === userId) {
        await this.frostlakeRepository.deleteProjectById(userId, projectId)
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

  async createAnalytics(userId: string, createAnalyticsDto: CreateAnalyticsDto) {
    try {
      const { component, event, info, statusCode, apiKey, clientId, clientSecret } = createAnalyticsDto
      const project = await this.frostlakeRepository.findProject(clientId, clientSecret)
      if (project.owner.toString() === userId) {
        const projectId = project.id
        await this.frostlakeRepository.createAnalytics(userId, projectId, component, event, info, statusCode, apiKey)
        return true
      }

      else {
        throw new ForbiddenException()
      }
    }

    catch (error) {
      throw new ForbiddenException()
    }
  }
}
