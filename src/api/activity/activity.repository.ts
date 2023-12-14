import { BadRequestException, Injectable } from "@nestjs/common"
import { ActivityModel } from "./entities/activity.entity"

@Injectable()
export class ActivityRepository {
  async createNewActivity(userId: string, activityDescription: string) {
    const activity = new ActivityModel({ userId, activityDescription })
    await activity.save()
  }

  async findActivitiesByUserId(userId: string) {
    const activities = await ActivityModel.find({ userId }).limit(50).sort("-createdAt")
    return activities
  }
}
