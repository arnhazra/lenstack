import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/user/schemas/user.schema"
import { Organization } from "src/core/organization/schemas/organization.schema"
import { pricingConfig, Products } from "src/core/pricing/pricing.config"

@Injectable()
export class CredentialGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const clientId = request.headers["client_id"] || request.query.client_id
    const clientSecret = request.headers["client_secret"] || request.query.client_secret

    try {
      if (!clientId || !clientSecret) {
        throw new ForbiddenException(statusMessages.noCredentialsProvided)
      }

      else {
        const orgResponse: Organization[] = await this.eventEmitter.emitAsync(EventsUnion.GetOrgDetails, { clientId, clientSecret })

        if (!orgResponse || !orgResponse.length) {
          throw new ForbiddenException(statusMessages.invalidCredentials)
        }

        else {
          const organization = orgResponse[0]
          const userId = String(organization.userId)
          const orgId = String(organization.id)
          const userResponse: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })

          if (!userResponse || !userResponse.length) {
            throw new ForbiddenException(statusMessages.invalidCredentials)
          }

          else {
            const user = userResponse[0]
            const product = request.url.split("/")[2]
            const { responseDelay, estimatedRequestCost } = pricingConfig.find((pricing) => pricing.computeTier === user.computeTier)
            const creditRequired = estimatedRequestCost[product as Products]

            if (creditRequired > user.walletBalance) {
              throw new ForbiddenException(statusMessages.insufficientWalletBalance)
            }

            else {
              await new Promise(resolve => setTimeout(resolve, responseDelay))
              const walletBalance = user.walletBalance - creditRequired
              await this.eventEmitter.emitAsync(EventsUnion.UpdateUserDetails, userId, "walletBalance", walletBalance)
              request.user = { userId, orgId }

              if (user.activityLog) {
                const { method, url: apiUri } = request
                this.eventEmitter.emit(EventsUnion.CreateActivity, { userId, method, apiUri })
              }

              return true
            }
          }
        }
      }
    }

    catch (error) {
      throw error
    }
  }
}
