import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { decodeJwt } from "src/utils/decodeJwt"
import { getTokenFromRedis } from "src/utils/redisHelper"

export const TokenAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const accessToken = request.headers["authorization"]?.split(" ")[1]

    if (!accessToken) {
      throw new UnauthorizedException()
    }

    else {
      try {
        const userId = decodeJwt(accessToken)
        const redisAccessToken = await getTokenFromRedis(userId)

        if (redisAccessToken === accessToken) {
          return userId
        }

        else {
          throw new UnauthorizedException()
        }
      }

      catch (error) {
        throw new UnauthorizedException()
      }
    }
  },
)