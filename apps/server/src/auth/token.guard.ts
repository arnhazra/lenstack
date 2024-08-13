import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import { statusMessages } from "src/utils/constants/status-messages"
import { envConfig } from "src/env.config"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"
import { ModRequest } from "./types/mod-request.interface"
import { User } from "src/core/api/user/schemas/user.schema"
import { Response } from "express"
import { otherConstants } from "src/utils/constants/other-constants"

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter2) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ModRequest = context.switchToHttp().getRequest()
    const globalResponse: Response = context.switchToHttp().getResponse()
    const accessToken = request.headers["authorization"]?.split(" ")[1]
    const refreshToken = request.headers["refresh_token"]

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException(statusMessages.unauthorized)
    }

    else {
      try {
        const decodedAccessToken = jwt.verify(accessToken, envConfig.accessTokenPublicKey, { algorithms: ["RS512"] })
        const userId = (decodedAccessToken as any).id
        const response: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })

        if (!response || !response.length) {
          throw new UnauthorizedException(statusMessages.unauthorized)
        }

        const { selectedOrgId, activityLog } = response[0]
        const orgId = String(selectedOrgId)
        request.user = { userId, orgId }

        if (activityLog) {
          const { method, url: apiUri } = request
          this.eventEmitter.emit(EventsUnion.CreateActivity, { userId, method, apiUri })
        }

        return true
      }

      catch (error) {
        if (error instanceof (jwt.TokenExpiredError)) {
          const decodedRefreshToken = jwt.verify(String(refreshToken), envConfig.refreshTokenPublicKey, { algorithms: ["RS512"] })
          const userId = (decodedRefreshToken as any).id
          const refreshTokenFromRedis: String[] = await this.eventEmitter.emitAsync(EventsUnion.GetToken, { userId })

          if (!refreshTokenFromRedis || !refreshTokenFromRedis.length || refreshToken !== refreshTokenFromRedis[0]) {
            await this.eventEmitter.emitAsync(EventsUnion.DeleteToken, { userId })
            throw new UnauthorizedException(statusMessages.unauthorized)
          }

          else {
            const user: User[] = await this.eventEmitter.emitAsync(EventsUnion.GetUserDetails, { _id: userId })
            const { selectedOrgId, activityLog, email } = user[0]
            const orgId = String(selectedOrgId)
            request.user = { userId, orgId }

            if (activityLog) {
              const { method, url: apiUri } = request
              this.eventEmitter.emit(EventsUnion.CreateActivity, { userId, method, apiUri })
            }

            const tokenPayload = { id: userId, email, iss: otherConstants.tokenIssuer }
            const newAccessToken = jwt.sign(tokenPayload, envConfig.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "5m" })
            console.log("here refresh")
            globalResponse.setHeader("token", newAccessToken)
            return true
          }
        }

        else {
          throw error
        }
      }
    }
  }
}
