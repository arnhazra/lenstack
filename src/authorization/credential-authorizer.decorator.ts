import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { SubscriptionModel } from "src/api/subscription/entities/subscription.entity"
import { WorkspaceModel } from "src/api/workspace/entities/workspace.entity"
import { apiPricing } from "src/config/subscription.config"
import { statusMessages } from "src/constants/status-messages"

export interface CredentialAuthorizerResponse {
  userId: string,
  workspaceId: string
}

export const CredentialAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<CredentialAuthorizerResponse> => {
    const request = ctx.switchToHttp().getRequest()
    const clientId = request.headers["client_id"]
    const clientSecret = request.headers["client_secret"]
    const requestedResource = String(request.originalUrl).split("/")[3]

    if (!clientId || !clientSecret) {
      throw new ForbiddenException(statusMessages.noCredentialsProvided)
    }

    else {
      try {
        const subscription = await SubscriptionModel.findOne({ clientId, clientSecret })

        if (subscription) {
          const workspaceId = subscription.workspaceId.toString()
          const workspace = await WorkspaceModel.findById(workspaceId)

          if (workspace) {
            const userId = workspace.ownerId.toString()
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
            throw new ForbiddenException(statusMessages.invalidCredentials)
          }
        }

        else {
          throw new ForbiddenException(statusMessages.invalidCredentials)
        }
      }

      catch (error) {
        throw error
      }
    }
  },
)