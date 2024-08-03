import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { statusMessages } from "src/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"
import { findSubscriptionByUserIdQuery } from "src/core/api/subscription/queries/find-subscription"
import { subscriptionConfig } from "src/core/api/subscription/subscription.config"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/api/user/schemas/user.schema"
import { Organization } from "src/core/api/organization/schemas/organization.schema"

@Injectable()
export class CredentialGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const clientId = request.headers["client_id"] || request.query.client_id
    const clientSecret = request.headers["client_secret"] || request.query.client_secret

    if (!clientId || !clientSecret) {
      throw new ForbiddenException(statusMessages.noCredentialsProvided)
    }

    else {
      try {
        const orgResponse: Organization[] = await this.eventEmitter.emitAsync(EventsUnion.GetOrgDetails, { clientId, clientSecret })
        const organization = orgResponse[0]

        if (organization) {
          const subscription = await findSubscriptionByUserIdQuery(organization.userId.toString())

          if (subscription) {
            const userId = organization.userId.toString()
            const orgId = organization.id.toString()
            const currentDate = new Date()
            const expiryDate = subscription.expiresAt
            const { method, url: apiUri } = request

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
                await new Promise(resolve => setTimeout(resolve, responseDelay))
                subscription.remainingCredits -= creditRequired
                await subscription.save()
                const userResponse: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })

                if (!userResponse) {
                  throw new ForbiddenException(statusMessages.unauthorized)
                }

                const { usageInsights } = userResponse[0]
                request.user = { userId, orgId }

                if (usageInsights) {
                  this.eventEmitter.emit(EventsUnion.CreateInsights, { userId, method, apiUri })
                }

                return true
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
  }
}
