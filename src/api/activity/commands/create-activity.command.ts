import { ActivityModel } from "../models/activity.model"

export async function createActivityCommand(userId: string, activityDescription: string) {
  const activity = new ActivityModel({ userId, activityDescription })
  await activity.save()
}