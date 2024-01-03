import { BadRequestException, Injectable } from "@nestjs/common"
import findActivitiesByUserId from "./queries/find-activities.query"

@Injectable()
export class ActivityService {
  async getActivitiesByUserId(userId: string) {
    try {
      const activities = await findActivitiesByUserId(userId)
      return activities
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
