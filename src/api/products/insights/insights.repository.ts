import { Injectable } from "@nestjs/common"
import { ProjectModel } from "./entities/project.entity"
import { AnalyticsModel } from "./entities/analytics.entity"

@Injectable()
export class InsightsRepository {
  async countProjects(workspaceId: string) {
    const count = await ProjectModel.find({ workspaceId }).countDocuments()
    return count
  }

  async createProject(workspaceId: string, name: string, projectId: string, projectPasskey: string) {
    const project = new ProjectModel({ workspaceId, name, projectId, projectPasskey })
    await project.save()
    return project
  }

  async getProjectsByWorkspaceId(workspaceId: string, searchQuery: string) {
    const projects = await ProjectModel.find({
      name: { $regex: searchQuery, $options: "i" },
      workspaceId: workspaceId
    })

    return projects
  }

  async findProjectById(projectId: string) {
    const project = await ProjectModel.findById(projectId)
    return project
  }

  async findProject(projectId: string, projectPasskey: string) {
    const project = await ProjectModel.findOne({ projectId, projectPasskey })
    return project
  }

  async findAnalyticsByProjectId(workspaceId: string, projectId: string) {
    const analytics = await AnalyticsModel.find({ workspaceId, projectId }).select("-workspaceId -projectId").sort({ createdAt: -1 })
    return analytics
  }

  async deleteProjectById(workspaceId: string, projectId: string) {
    await AnalyticsModel.deleteMany({ workspaceId, projectId })
    await ProjectModel.findByIdAndDelete(projectId)
    return true
  }

  async createAnalytics(workspaceId: string, projectId: string, component: string, event: string, info: string, statusCode: string) {
    const analytics = new AnalyticsModel({ workspaceId, projectId, component, event, info, statusCode })
    await analytics.save()
    return true
  }
}
