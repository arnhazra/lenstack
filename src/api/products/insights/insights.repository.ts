import { Injectable } from "@nestjs/common"
import { InsightsProjectModel } from "./entities/insights-project.entity"
import { InsightsAnalyticsModel } from "./entities/insights-analytics.entity"

@Injectable()
export class InsightsRepository {
  async countProjects(workspaceId: string) {
    const count = await InsightsProjectModel.find({ workspaceId }).countDocuments()
    return count
  }

  async createProject(workspaceId: string, name: string, clientId: string, clientSecret: string) {
    const project = new InsightsProjectModel({ workspaceId, name, clientId, clientSecret })
    await project.save()
    return project
  }

  async getProjectsByWorkspaceId(workspaceId: string, searchQuery: string) {
    const projects = await InsightsProjectModel.find({
      name: { $regex: searchQuery, $options: "i" },
      workspaceId: workspaceId
    })

    return projects
  }

  async findProjectById(projectId: string) {
    const project = await InsightsProjectModel.findById(projectId)
    return project
  }

  async findProject(clientId: string, clientSecret: string) {
    const project = await InsightsProjectModel.findOne({ clientId, clientSecret })
    return project
  }

  async findAnalyticsByProjectId(workspaceId: string, projectId: string) {
    const analytics = await InsightsAnalyticsModel.find({ workspaceId, projectId }).select("-workspaceId -projectId").sort({ createdAt: -1 })
    return analytics
  }

  async deleteProjectById(workspaceId: string, projectId: string) {
    await InsightsAnalyticsModel.deleteMany({ workspaceId, projectId })
    await InsightsProjectModel.findByIdAndDelete(projectId)
    return true
  }

  async createAnalytics(workspaceId: string, projectId: string, component: string, event: string, info: string, statusCode: string) {
    const analytics = new InsightsAnalyticsModel({ workspaceId, projectId, component, event, info, statusCode })
    await analytics.save()
    return true
  }
}
