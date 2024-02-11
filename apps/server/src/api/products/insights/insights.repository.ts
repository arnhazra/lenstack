import { Injectable } from "@nestjs/common"
import { AnalyticsModel } from "./entities/analytics.entity"

@Injectable()
export class InsightsRepository {
  async findAnalyticsByWorkspaceId(workspaceId: string) {
    const analytics = await AnalyticsModel.find({ workspaceId }).sort({ createdAt: -1 })
    return analytics
  }

  async createAnalytics(workspaceId: string, component: string, event: string, info: string, statusCode: string) {
    const analytics = new AnalyticsModel({ workspaceId, component, event, info, statusCode })
    await analytics.save()
    return true
  }
}
