import { AnalyticsModel } from "../models/analytics.model"

export async function getAnalyticsByWorkspaceIdQuery(workspaceId: string) {
  const analytics = await AnalyticsModel.find({ workspaceId }).sort({ createdAt: -1 })
  return analytics
}