import { CreateAnalyticsDto } from "../dto/create-analytics.dto"
import { AnalyticsModel } from "../models/analytics.model"

export async function createAnalyticsCommand(workspaceId: string, params: CreateAnalyticsDto) {
  const { component, event, info, statusCode } = params
  const analytics = new AnalyticsModel({ workspaceId, component, event, info, statusCode })
  await analytics.save()
  return true
}