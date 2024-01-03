import { ActivityModel } from "../models/activity.model"

export default async function createActivity(userId: string, activityDescription: string) {
  const activity = new ActivityModel({ userId, activityDescription })
  await activity.save()
}