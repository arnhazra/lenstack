import { Injectable } from "@nestjs/common"
import { MasterFrostlakeProjectModel, ReplicaFrostlakeProjectModel } from "./entities/frostlake-project.entity"
import { MasterFrostlakeAnalyticsModel, ReplicaFrostlakeAnalyticsModel } from "./entities/frostlake-analytics.entity"

@Injectable()
export class FrostlakeRepository {
  async countProjects(userId: string) {
    const count = await MasterFrostlakeProjectModel.find({ owner: userId }).count()
    return count
  }

  async createProject(owner: string, name: string, clientId: string, clientSecret: string) {
    const project = new MasterFrostlakeProjectModel({ owner, name, clientId, clientSecret })
    await project.save()
    const projectReplica = new ReplicaFrostlakeProjectModel({ _id: project.id, owner, name, clientId, clientSecret })
    await projectReplica.save()
    return project
  }

  async getProjectsByUserId(owner: string) {
    const projects = await MasterFrostlakeProjectModel.find({ owner })
    return projects
  }

  async findProjectById(projectId: string) {
    const project = await MasterFrostlakeProjectModel.findById(projectId)
    return project
  }

  async findProject(clientId: string, clientSecret: string) {
    const project = await MasterFrostlakeProjectModel.findOne({ clientId, clientSecret })
    return project
  }

  async findAnalyticsByProjectId(owner: string, projectId: string) {
    const analytics = await MasterFrostlakeAnalyticsModel.find({ owner, projectId }).select("-apiKey -owner -projectId").sort({ createdAt: -1 })
    return analytics
  }

  async deleteProjectById(owner: string, projectId: string) {
    await MasterFrostlakeAnalyticsModel.deleteMany({ owner, projectId })
    await ReplicaFrostlakeAnalyticsModel.deleteMany({ owner, projectId })
    await MasterFrostlakeProjectModel.findByIdAndDelete(projectId)
    await ReplicaFrostlakeProjectModel.findByIdAndDelete(projectId)
    return true
  }

  async createAnalytics(userId: string, projectId: string, component: string, event: string, info: string, statusCode: string, apiKey: string) {
    const analytics = new MasterFrostlakeAnalyticsModel({ owner: userId, projectId, component, event, info, statusCode, apiKey })
    await analytics.save()
    const analyticsReplica = new ReplicaFrostlakeAnalyticsModel({ _id: analytics.id, owner: userId, projectId, component, event, info, statusCode, apiKey })
    await analyticsReplica.save()
    return true
  }

  async findCountByApiKey(apiKey: string) {
    const airlakeUsedTokens = await MasterFrostlakeAnalyticsModel.find({ apiKey }).countDocuments()
    return airlakeUsedTokens
  }
}
