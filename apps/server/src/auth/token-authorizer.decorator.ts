import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { findUserByIdQuery } from "src/core/api/user/queries/find-user-by-id"
import { envConfig } from "src/env.config"
import { statusMessages } from "src/utils/constants/status-messages"
import * as jwt from "jsonwebtoken"
import { getTokenFromRedis } from "src/utils/redis-helper"

export interface TokenAuthorizerResponse {
  userId: string,
  orgId: string
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
        const decoded = jwt.verify(accessToken, envConfig.authPublicKey, { algorithms: ["RS512"] })
        const userId = (decoded as any).id
        const redisAccessToken = await getTokenFromRedis(userId)

        if (redisAccessToken === accessToken) {
          const { selectedOrgId } = await findUserByIdQuery(userId)
          const orgId = selectedOrgId.toString()
          return { userId, orgId }
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