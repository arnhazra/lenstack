import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { UserModel } from "src/api/user/entities/user.entity"
import { statusMessages } from "src/constants/statusMessages"
import { decodeJwt } from "src/utils/decodeJwt"
import { getTokenFromRedis } from "src/utils/redisHelper"

export interface TokenAuthorizerReturnType {
  userId: string,
  workspaceId: string
}

export const TokenAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<TokenAuthorizerReturnType> => {
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