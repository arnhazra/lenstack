import { ActivityModel } from "../models/activity.model"

export async function findActivitiesByUserIdQuery(userId: string) {
  const activities = await ActivityModel.find({ userId }).limit(50).sort("-createdAt")
  return activities
}