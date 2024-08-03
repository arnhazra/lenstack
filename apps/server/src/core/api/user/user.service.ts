import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import * as jwt from "jsonwebtoken"
import { envConfig } from "src/env.config"
import { generateAuthPasskey, verifyAuthPasskey, generatePasskeyEmailBody, generatePasskeyEmailSubject } from "./user.util"
import { otherConstants } from "src/utils/constants/other-constants"
import { statusMessages } from "src/utils/constants/status-messages"
import { findSubscriptionByUserIdQuery } from "../subscription/queries/find-subscription"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs"
import { FindUserByEmailQuery } from "./queries/impl/find-user-by-email.query"
import { User } from "./schemas/user.schema"
import { SendPasskeyEvent } from "./events/impl/send-passkey-email.event"
import { FindUserByIdQuery } from "./queries/impl/find-user-by-id.query"
import { UpdateSelectedOrgCommand } from "./commands/impl/update-selected-org.command"
import { CreateUserCommand } from "./commands/impl/create-user.command"
import { UpdateCarbonSettingsCommand } from "./commands/impl/update-carbon-settings.command"
import { UpdateUsageInsightsSettingsCommand } from "./commands/impl/update-usage-insights.command"
import { Organization } from "../organization/schemas/organization.schema"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus
  ) {
    this.authPrivateKey = envConfig.authPrivateKey
  }

  async generatePasskey(generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { email } = generateAuthPasskeyDto
      const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email))
      const { fullHash: hash, passKey } = generateAuthPasskey(email)
      const subject: string = generatePasskeyEmailSubject()
      const body: string = generatePasskeyEmailBody(passKey)
      await this.eventBus.publish(new SendPasskeyEvent(email, subject, body))
      return { user, hash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyPasskey(verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const { email, hash, passKey } = verifyAuthPasskeyDto
      const isOTPValid = verifyAuthPasskey(email, hash, passKey)

      if (isOTPValid) {
        const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email))

        if (user) {
          const redisAccessToken = await this.eventEmitter.emitAsync(EventsUnion.GetAccessToken, { userId: user.id })

          if (redisAccessToken.toString()) {
            const accessToken = redisAccessToken
            return { accessToken, success: true, user }
          }

          else {
            const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
            const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
            await this.eventEmitter.emitAsync(EventsUnion.SetAccessToken, { userId: user.id, accessToken })
            return { accessToken, success: true, user }
          }
        }

        else {
          const newUser = await this.commandBus.execute<CreateUserCommand, User>(new CreateUserCommand(email))
          const organization = await createOrganizationCommand("Default Org", newUser.id)
          await this.commandBus.execute(new UpdateSelectedOrgCommand(newUser.id, organization.id))
          const payload = { id: newUser.id, email: newUser.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
          await this.eventEmitter.emitAsync(EventsUnion.SetAccessToken, { userId: newUser.id, accessToken })
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
      const user = await this.queryBus.execute<FindUserByIdQuery, User>(new FindUserByIdQuery(userId))

      if (user) {
        const orgResponse: Organization[] = await this.eventEmitter.emitAsync(EventsUnion.GetOrgDetails, { _id: orgId })
        const organization = orgResponse[0]
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
      await this.eventEmitter.emitAsync(EventsUnion.DeleteAccessToken, { userId })
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateCarbonSettings(userId: string, value: boolean) {
    try {
      await this.commandBus.execute(new UpdateCarbonSettingsCommand(userId, value))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async changeUsageInsightsSettings(userId: string, value: boolean) {
    try {
      await this.commandBus.execute(new UpdateUsageInsightsSettingsCommand(userId, value))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
