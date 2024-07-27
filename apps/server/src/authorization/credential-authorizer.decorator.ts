import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common"
import { findSubscriptionByUserIdQuery } from "src/api/subscription/queries/find-subscription"
import { findOrganizationByCredentialQuery } from "src/api/organization/queries/find-org-by-credential.query"
import { subscriptionConfig } from "src/api/subscription/subscription.config"
import { statusMessages } from "src/constants/status-messages"
import { delay } from "src/lib/delay"

export interface CredentialAuthorizerResponse {
  userId: string,
  orgId: string
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
        const organization = await findOrganizationByCredentialQuery(clientId, clientSecret)

        if (organization) {
          const subscription = await findSubscriptionByUserIdQuery(organization.userId.toString())

          if (subscription) {
            const userId = organization.userId.toString()
            const orgId = organization.id.toString()
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
                const responseDelay = subscriptionConfig.find((sub) => sub.planName === subscription.selectedPlan).responseDelay
                await delay(responseDelay)
                subscription.remainingCredits -= creditRequired
                await subscription.save()
                return { userId, orgId }
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