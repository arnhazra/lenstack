import { BadRequestException, Injectable } from "@nestjs/common"
import { findActivitiesByUserIdQuery } from "./queries/find-activities.query"

@Injectable()
export class ActivityService {
  async getActivitiesByUserId(userId: string) {
    try {
      const activities = await findActivitiesByUserIdQuery(userId)
      return activities
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
