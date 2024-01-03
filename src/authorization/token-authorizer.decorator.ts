import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import createActivity from "src/api/activity/commands/create-activity.command"
import { UserModel } from "src/api/user/entities/user.entity"
import { statusMessages } from "src/constants/status-messages"
import getActivityDescription from "src/utils/activity-gen"
import { decodeJwt } from "src/utils/decode-jwt"
import { getTokenFromRedis } from "src/utils/redis-helper"

export interface TokenAuthorizerResponse {
  userId: string,
  workspaceId: string
}

export const TokenAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<TokenAuthorizerResponse> => {
    const request = ctx.switchToHttp().getRequest()
    const accessToken = request.headers["authorization"]?.split(" ")[1]
    const requestUrl = String(request.url)

    if (!accessToken) {
      throw new UnauthorizedException(statusMessages.unauthorized)
    }

    else {
      try {
        const userId = decodeJwt(accessToken)
        const redisAccessToken = await getTokenFromRedis(userId)

        if (redisAccessToken === accessToken) {
          const activityDescription = getActivityDescription(requestUrl)
          if (activityDescription !== "Unknown Activity") {
            await createActivity(userId, activityDescription)
          }

          const { selectedWorkspaceId } = await UserModel.findById(userId)
          const workspaceId = selectedWorkspaceId.toString()
          return { userId, workspaceId }
        }

        else {
          throw new UnauthorizedException(statusMessages.unauthorized)
        }
      }

      catch (error) {
        throw new UnauthorizedException(statusMessages.unauthorized)
      }
    }
  },
)