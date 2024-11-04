import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/user/schemas/user.schema"
import { Organization } from "src/core/organization/schemas/organization.schema"
import { Subscription } from "src/core/subscription/schemas/subscription.schema"

@Injectable()
export class CredentialGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const accessToken =
      request.headers["access_token"] || request.query.access_token

    try {
      if (!accessToken) {
        throw new ForbiddenException(statusMessages.noCredentialsProvided)
      } else {
        const orgResponse: Organization[] = await this.eventEmitter.emitAsync(
          EventsUnion.GetOrgDetails,
          { accessToken }
        )

        if (!orgResponse || !orgResponse.length) {
          throw new ForbiddenException(statusMessages.invalidCredentials)
        } else {
          const organization = orgResponse[0]
          const userId = String(organization.userId)
          const orgId = String(organization.id)
          const userResponse: User[] = await this.eventEmitter.emitAsync(
            EventsUnion.GetUserDetails,
            { _id: userId }
          )

          if (!userResponse || !userResponse.length) {
            throw new ForbiddenException(statusMessages.invalidCredentials)
          } else {
            const user = userResponse[0]
            const subscriptionRes: Subscription[] =
              await this.eventEmitter.emitAsync(
                EventsUnion.GetSubscriptionDetails,
                userId
              )

            if (!subscriptionRes || !subscriptionRes.length) {
              throw new ForbiddenException(statusMessages.subscriptionNotFound)
            } else {
              const subscription = subscriptionRes[0]
              const product = request.url.split("/")[2]
              const creditRequired = 0.05 //change later
              if (creditRequired > subscription.xp) {
                throw new ForbiddenException(
                  statusMessages.insufficientXPCredits
                )
              } else {
                await new Promise((resolve) =>
                  setTimeout(resolve, subscription.platformDelay)
                )
                request.user = { userId, orgId }
                subscription.xp -= creditRequired
                await subscription.save()

                if (user.activityLog) {
                  const { method, url: apiUri } = request
                  this.eventEmitter.emit(EventsUnion.CreateActivity, {
                    userId,
                    method,
                    apiUri,
                  })
                }

                return true
              }
            }
          }
        }
      }
    } catch (error) {
      throw error
    }
  }
}
