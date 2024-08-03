import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import * as jwt from "jsonwebtoken"
import { statusMessages } from "src/utils/constants/status-messages"
import { envConfig } from "src/env.config"
import getTokenQuery from "src/core/events/accesstoken/queries/get-token.query"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/api/user/schemas/user.schema"

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const accessToken = request.headers["authorization"]?.split(" ")[1]

    if (!accessToken) {
      throw new UnauthorizedException(statusMessages.unauthorized)
    }

    else {
      try {
        const decoded = jwt.verify(accessToken, envConfig.authPublicKey, { algorithms: ["RS512"] })
        const userId = (decoded as any).id
        const redisAccessToken = await getTokenQuery(userId)
        const { method, url: apiUri } = request

        if (accessToken === redisAccessToken) {
          const response: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })

          if (!response || !response.length) {
            throw new UnauthorizedException(statusMessages.unauthorized)
          }

          const { selectedOrgId, usageInsights } = response[0]
          const orgId = selectedOrgId.toString()
          request.user = { userId, orgId }

          if (usageInsights) {
            this.eventEmitter.emit(EventsUnion.CreateInsights, { userId, method, apiUri })
          }

          return true
        }

        else {
          throw new UnauthorizedException(statusMessages.unauthorized)
        }
      }

      catch (error) {
        throw new UnauthorizedException(statusMessages.unauthorized)
      }
    }
  }
}
