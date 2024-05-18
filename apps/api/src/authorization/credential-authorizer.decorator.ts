import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { findSubscriptionByUserIdQuery } from "src/api/subscription/queries/find-subscription"
import { findWorkspaceByCredentialQuery } from "src/api/workspace/queries/find-workspace-by-credential.query"
import { SubscriptionPlans } from "src/api/subscription/subscription.config"
import { statusMessages } from "src/constants/status-messages"
import { delay } from "src/lib/delay"

export interface CredentialAuthorizerResponse {
  userId: string,
  workspaceId: string
}

export const CredentialAuthorizer = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<CredentialAuthorizerResponse> => {
    const request = ctx.switchToHttp().getRequest()
    const clientId = request.headers["client_id"] || request.query.client_id
    const clientSecret = request.headers["client_secret"] || request.query.client_secret

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
              const creditRequired = 1

              if (creditRequired > subscription.remainingCredits) {
                throw new ForbiddenException(statusMessages.subscriptionLimitReached)
              }

              else {
                if (subscription.selectedPlan === SubscriptionPlans.Trial) {
                  await delay(500)
                }

                subscription.remainingCredits -= creditRequired
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