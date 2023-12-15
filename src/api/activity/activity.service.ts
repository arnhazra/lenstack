import { BadRequestException, Injectable } from "@nestjs/common"
import { ActivityRepository } from "./activity.repository"

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) { }

  async getActivitiesByUserId(userId: string) {
    try {
      const activities = await this.activityRepository.findActivitiesByUserId(userId)
      return activities
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
