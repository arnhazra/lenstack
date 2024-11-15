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
import { Workspace } from "src/core/workspace/schemas/workspace.schema"
import { Subscription } from "src/core/subscription/schemas/subscription.schema"
import { subscriptionPricing } from "src/core/subscription/subscription.config"

@Injectable()
export class CredentialGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const accessKey = request.headers["access_key"] || request.query.access_key

    try {
      if (!accessKey) {
        throw new ForbiddenException(statusMessages.noCredentialsProvided)
      } else {
        const workspaceResponse: Workspace[] =
          await this.eventEmitter.emitAsync(EventsUnion.GetWorkspaceDetails, {
            accessKey,
          })

        if (
          !workspaceResponse ||
          !workspaceResponse.length ||
          (workspaceResponse &&
            workspaceResponse.length &&
            workspaceResponse[0] === null)
        ) {
          throw new ForbiddenException(statusMessages.invalidCredentials)
        } else {
          const workspace = workspaceResponse[0]
          const userId = String(workspace.userId)
          const workspaceId = String(workspace.id)
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
              const requestCost = subscriptionPricing.find(
                (item) =>
                  item.subscriptionTier === subscription.subscriptionTier
              ).requestCost
              if (requestCost > subscription.xp) {
                throw new ForbiddenException(
                  statusMessages.insufficientXPCredits
                )
              } else {
                await new Promise((resolve) =>
                  setTimeout(resolve, subscription.platformDelay)
                )
                request.user = { userId, workspaceId }
                subscription.xp -= requestCost
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
