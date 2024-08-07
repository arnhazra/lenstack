import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"
import { subscriptionConfig } from "src/core/api/subscription/subscription.config"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/api/user/schemas/user.schema"
import { Organization } from "src/core/api/organization/schemas/organization.schema"
import { Subscription } from "src/core/api/subscription/schemas/subscription.schema"

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

    try {
      const orgResponse: Organization[] = await this.eventEmitter.emitAsync(EventsUnion.GetOrgDetails, { clientId, clientSecret })

      if (!orgResponse || !orgResponse.length) {
        throw new ForbiddenException(statusMessages.invalidCredentials)
      }

      const organization = orgResponse[0]
      const subscriptionRes: Subscription[] = await this.eventEmitter.emitAsync(EventsUnion.FindSubscription, organization.userId.toString())

      if (!subscriptionRes || !subscriptionRes.length) {
        throw new ForbiddenException(statusMessages.noSubscriptionsFound)
      }

      const subscription = subscriptionRes[0]
      const userId = String(organization.userId)
      const orgId = String(organization.id)
      const currentDate = new Date()
      const expiryDate = subscription.expiresAt

      if (currentDate > expiryDate) {
        throw new ForbiddenException(statusMessages.subscriptionExpired)
      }

      const creditRequired = 1

      if (creditRequired > subscription.remainingCredits) {
        throw new ForbiddenException(statusMessages.subscriptionLimitReached)
      }

      const responseDelay = subscriptionConfig.find((sub) => sub.planName === subscription.selectedPlan).responseDelay
      await new Promise(resolve => setTimeout(resolve, responseDelay))
      subscription.remainingCredits -= creditRequired
      await subscription.save()
      const userResponse: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })

      if (!userResponse || !userResponse.length) {
        throw new ForbiddenException(statusMessages.unauthorized)
      }

      const { usageInsights } = userResponse[0]
      request.user = { userId, orgId }

      if (usageInsights) {
        const { method, url: apiUri } = request
        this.eventEmitter.emit(EventsUnion.CreateInsights, { userId, method, apiUri })
      }

      return true
    }

    catch (error) {
      throw error
    }
  }
}
