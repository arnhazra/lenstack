import { ActivityModel } from "../models/activity.model"

export default async function findActivitiesByUserId(userId: string) {
  const activities = await ActivityModel.find({ userId }).limit(50).sort("-createdAt")
  return activities
}