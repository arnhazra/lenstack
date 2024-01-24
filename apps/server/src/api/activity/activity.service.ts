import { BadRequestException, Injectable } from "@nestjs/common"
import { findActivitiesByWorkspaceIdQuery } from "./queries/find-activities.query"

@Injectable()
export class ActivityService {
  async getActivitiesByWorkspaceId(workspaceId: string) {
    try {
      const activities = await findActivitiesByWorkspaceIdQuery(workspaceId)
      return activities
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
