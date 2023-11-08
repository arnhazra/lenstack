import { Injectable } from "@nestjs/common"
import { FrostlakeProjectModel } from "./entities/frostlake-project.entity"
import { FrostlakeAnalyticsModel } from "./entities/frostlake-analytics.entity"

@Injectable()
export class FrostlakeRepository {
  async countProjects(workspaceId: string) {
    const count = await FrostlakeProjectModel.find({ workspaceId }).count()
    return count
  }

  async createProject(workspaceId: string, name: string, clientId: string, clientSecret: string) {
    const project = new FrostlakeProjectModel({ workspaceId, name, clientId, clientSecret })
    await project.save()
    return project
  }

  async getProjectsByUserId(workspaceId: string) {
    const projects = await FrostlakeProjectModel.find({ workspaceId })
    return projects
  }

  async findProjectById(projectId: string) {
    const project = await FrostlakeProjectModel.findById(projectId)
    return project
  }

  async findProject(clientId: string, clientSecret: string) {
    const project = await FrostlakeProjectModel.findOne({ clientId, clientSecret })
    return project
  }

  async findAnalyticsByProjectId(workspaceId: string, projectId: string) {
    const analytics = await FrostlakeAnalyticsModel.find({ workspaceId, projectId }).select("-workspaceId -projectId").sort({ createdAt: -1 })
    return analytics
  }

  async deleteProjectById(workspaceId: string, projectId: string) {
    await FrostlakeAnalyticsModel.deleteMany({ workspaceId, projectId })
    await FrostlakeProjectModel.findByIdAndDelete(projectId)
    return true
  }

  async createAnalytics(workspaceId: string, projectId: string, component: string, event: string, info: string, statusCode: string) {
    const analytics = new FrostlakeAnalyticsModel({ workspaceId, projectId, component, event, info, statusCode })
    await analytics.save()
    return true
  }
}
