import { createParamDecorator, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { UserModel } from "src/api/user/entities/user.entity"
import { apiPricing } from "src/config/subscription.config"
import { statusMessages } from "src/constants/status-messages"
import { decodeJwt } from "src/utils/decode-jwt"
import { getTokenFromRedis } from "src/utils/redis-helper"

export interface TokenCredAuthorizerResponse {
  userId: string,
  workspaceId: string
}

export const TokenCredAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<TokenCredAuthorizerResponse> => {
    const request = ctx.switchToHttp().getRequest()
    const accessToken = request.headers["authorization"]?.split(" ")[1]
    const requestedResource = String(request.originalUrl).split("/")[3]

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
          const subscription = await SubscriptionModel.findOne({ workspaceId })

          if (subscription) {
            const currentDate = new Date()
            const expiryDate = subscription.expiresAt

            if (currentDate > expiryDate) {
              throw new ForbiddenException(statusMessages.credentialsExpired)
            }

            else {
              const creditRequiredForCurrentRequest = apiPricing[`${requestedResource}`]

              if (creditRequiredForCurrentRequest > subscription.remainingCredits) {
                throw new ForbiddenException(statusMessages.credentialsLimitReached)
              }

              else {
                subscription.remainingCredits -= creditRequiredForCurrentRequest
                await subscription.save()
                return { userId, workspaceId }
              }
            }
          }

          else {
            throw new ForbiddenException(statusMessages.noSubscriptionsFound)
          }
        }

        else {
          throw new UnauthorizedException(statusMessages.unauthorized)
        }
      }

      catch (error) {
        throw error
      }
    }
  },
)