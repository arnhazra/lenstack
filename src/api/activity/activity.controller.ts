import { BadRequestException, Controller, Get } from "@nestjs/common"
import { ActivityService } from "./activity.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Get("getactivities")
  async getActivitiesByUserId(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const activities = await this.activityService.getActivitiesByUserId(uft.userId)
      return { activities }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
