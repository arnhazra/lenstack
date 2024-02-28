import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { findSubscriptionByUserIdQuery } from "src/api/subscription/queries/find-subscription"
import { findWorkspaceByCredentialQuery } from "src/api/workspace/queries/find-workspace-by-credential"
import { apiPricing, SubscriptionPlans } from "src/api/subscription/subscription.config"
import { statusMessages } from "src/constants/status-messages"
import { delay } from "src/lib/delay"

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
        const workspace = await findWorkspaceByCredentialQuery(clientId, clientSecret)

        if (workspace) {
          const subscription = await findSubscriptionByUserIdQuery(workspace.userId.toString())

          if (subscription) {
            const userId = workspace.userId.toString()
            const workspaceId = workspace.id.toString()
            const currentDate = new Date()
            const expiryDate = subscription.expiresAt

            if (currentDate > expiryDate) {
              throw new ForbiddenException(statusMessages.subscriptionExpired)
            }

            else {
              const creditRequiredForCurrentRequest = apiPricing[`${requestedResource}`]

              if (creditRequiredForCurrentRequest > subscription.remainingCredits) {
                throw new ForbiddenException(statusMessages.subscriptionLimitReached)
              }

              else {
                if (subscription.selectedPlan === SubscriptionPlans.Hobby) {
                  await delay(500)
                }

                if (subscription.selectedPlan === SubscriptionPlans.Starter) {
                  await delay(200)
                }

                if (subscription.selectedPlan === SubscriptionPlans.Premium) {
                  await delay(100)
                }

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
          throw new ForbiddenException(statusMessages.invalidCredentials)
        }
      }

      catch (error) {
        throw error
      }
    }
  },
)