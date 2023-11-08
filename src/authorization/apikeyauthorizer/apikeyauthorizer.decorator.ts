import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { WorkspaceModel } from "src/api/workspace/entities/workspace.entity"
import { apiPricing } from "src/config/subscriptionConfig"
import { statusMessages } from "src/constants/statusMessages"

export interface ApiKeyAuthorizerReturnType {
  userId: string,
  workspaceId: string
}

export const ApiKeyAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<ApiKeyAuthorizerReturnType> => {
    const request = ctx.switchToHttp().getRequest()
    const apiKey = request.headers["x-api-key"]
    const requestedResource = String(request.originalUrl).split("/")[2]

    if (!apiKey) {
      throw new ForbiddenException(statusMessages.noApiKey)
    }

    else {
      try {
        const subscription = await SubscriptionModel.findOne({ apiKey })
        const workspaceId = subscription.workspaceId.toString()
        const workspace = await WorkspaceModel.findById(workspaceId)
        const userId = workspace.ownerId.toString()

        if (subscription) {
          const currentDate = new Date()
          const expiryDate = subscription.expiresAt

          if (currentDate > expiryDate) {
            await SubscriptionModel.findOneAndDelete({ apiKey })
            throw new ForbiddenException(statusMessages.apiKeyExpired)
          }

          else {
            const creditRequiredForCurrentRequest = apiPricing[`${requestedResource}`]

            if (creditRequiredForCurrentRequest > subscription.remainingCredits) {
              throw new ForbiddenException(statusMessages.apiKeyLimitReached)
            }

            else {
              subscription.remainingCredits -= creditRequiredForCurrentRequest
              await subscription.save()
              return { userId, workspaceId }
            }
          }
        }

        else {
          throw new ForbiddenException(statusMessages.invalidApiKey)
        }
      }

      catch (error) {
        throw error
      }
    }
  },
)