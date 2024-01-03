import { ActivityModel } from "../models/activity.model"

export async function findActivitiesByWorkspaceIdQuery(workspaceId: string) {
  const activities = await ActivityModel.find({ workspaceId }).limit(50).sort("-createdAt")
  return activities
}