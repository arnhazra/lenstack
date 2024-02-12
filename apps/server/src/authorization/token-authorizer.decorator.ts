import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { findUserByIdQuery } from "src/api/user/queries/find-user-by-id"
import { statusMessages } from "src/constants/status-messages"
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

    if (!accessToken) {
      throw new UnauthorizedException(statusMessages.unauthorized)
    }

    else {
      try {
        const userId = decodeJwt(accessToken)
        const redisAccessToken = await getTokenFromRedis(userId)

        if (redisAccessToken === accessToken) {
          const { selectedWorkspaceId } = await findUserByIdQuery(userId)
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