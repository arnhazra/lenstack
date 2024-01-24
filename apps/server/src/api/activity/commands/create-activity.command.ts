import { ActivityModel } from "../models/activity.model"

export async function createActivityCommand(workspaceId: string, activityDescription: string) {
  const activity = new ActivityModel({ workspaceId, activityDescription })
  await activity.save()
}