import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import * as jwt from "jsonwebtoken"
import { envConfig } from "src/env.config"
import { generateAuthPasskey, verifyAuthPasskey, generateEmailBody } from "./user.util"
import { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis } from "src/utils/redis-helper"
import { otherConstants } from "src/utils/constants/other-constants"
import { statusMessages } from "src/utils/constants/status-messages"
import { findOrganizationByIdQuery } from "../organization/queries/find-org-by-id.query"
import { createOrganizationCommand } from "../organization/commands/create-organization.command"
import { findMyOrganizationsQuery } from "../organization/queries/find-org.query"
import { findSubscriptionByUserIdQuery } from "../subscription/queries/find-subscription"
import { findUserByEmailQuery } from "./queries/find-user-by-email"
import { updateSelectedOrganizationCommand } from "./commands/update-selected-org.command"
import { createUserCommand } from "./commands/create-user.command"
import { findUserByIdQuery } from "./queries/find-user-by-id"
import { HttpService } from "@nestjs/axios"
import updateCarbonSettings from "./commands/update-carbon-settings.command"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string

  constructor(private readonly httpService: HttpService, private readonly eventEmitter: EventEmitter2) {
    this.authPrivateKey = envConfig.authPrivateKey
  }

  async generateAuthPasskey(generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { email } = generateAuthPasskeyDto
      let user = await findUserByEmailQuery(email)
      const { fullHash, passKey } = await generateAuthPasskey(email)
      const subject: string = `${envConfig.brandName} Auth Passkey`
      const body: string = generateEmailBody(passKey)
      this.eventEmitter.emitAsync(EventsUnion.SendEmail, { receiverEmail: email, subject, body })
      return { user, hash: fullHash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyAuthPasskey(verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const { email, hash, passKey } = verifyAuthPasskeyDto
      const isOTPValid = verifyAuthPasskey(email, hash, passKey)

      if (isOTPValid) {
        let user = await findUserByEmailQuery(email)

        if (user) {
          const redisAccessToken = await getTokenFromRedis(user.id)
          const organizationCount = (await findMyOrganizationsQuery(user.id)).length

          if (!organizationCount) {
            const organization = await createOrganizationCommand("Default Org", user.id)
            await updateSelectedOrganizationCommand(user.id, organization.id)
          }

          if (redisAccessToken) {
            const accessToken = redisAccessToken
            return { accessToken, success: true, user }
          }

          else {
            const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
            const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
            await setTokenInRedis(user.id, accessToken)
            return { accessToken, success: true, user }
          }
        }

        else {
          const newUser = await createUserCommand(email)
          const organization = await createOrganizationCommand("Default Org", newUser.id)
          await updateSelectedOrganizationCommand(newUser.id, organization.id)
          const payload = { id: newUser.id, email: newUser.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
          await setTokenInRedis(newUser.id, accessToken)
          return { accessToken, success: true, user: newUser }
        }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getUserDetails(userId: string, orgId: string) {
    try {
      const user = await findUserByIdQuery(userId)

      if (user) {
        const organization = await findOrganizationByIdQuery(orgId)
        const subscription = await findSubscriptionByUserIdQuery(userId)
        let hasActiveSubscription = false

        if (subscription && subscription.expiresAt > new Date() && subscription.remainingCredits > 0) {
          hasActiveSubscription = true
        }

        return { user, organization, subscription, hasActiveSubscription }
      }

      else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async signOut(userId: string) {
    try {
      await removeTokenFromRedis(userId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateCarbonSettings(userId: string, value: boolean) {
    try {
      await updateCarbonSettings(userId, value)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
