import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import * as jwt from "jsonwebtoken"
import { envConfig } from "src/env.config"
import { generateAuthPasskey, verifyAuthPasskey, generatePasskeyEmailBody, generatePasskeyEmailSubject } from "./user.util"
import { otherConstants } from "src/shared/utils/constants/other-constants"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindUserByEmailQuery } from "./queries/impl/find-user-by-email.query"
import { User } from "./schemas/user.schema"
import { FindUserByIdQuery } from "./queries/impl/find-user-by-id.query"
import { CreateUserCommand } from "./commands/impl/create-user.command"
import { Organization } from "../organization/schemas/organization.schema"
import { AttributeNames, UpdateAttributeCommand } from "./commands/impl/update-attribute.command"
import { randomUUID } from "crypto"

@Injectable()
export class UserService {
  private readonly accessTokenPrivateKey: string

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    this.accessTokenPrivateKey = envConfig.accessTokenPrivateKey
  }

  async generatePasskey(generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { email } = generateAuthPasskeyDto
      const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email))
      const { fullHash: hash, passKey } = generateAuthPasskey(email)
      const subject: string = generatePasskeyEmailSubject()
      const body: string = generatePasskeyEmailBody(passKey)
      await this.eventEmitter.emitAsync(EventsUnion.SendEmail, { email, subject, body })
      return { user, hash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyPasskey(verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const { email, hash, passKey, name } = verifyAuthPasskeyDto
      const isOTPValid = verifyAuthPasskey(email, hash, passKey)

      if (isOTPValid) {
        const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email))

        if (user) {
          const refreshTokenFromRedis = await this.eventEmitter.emitAsync(EventsUnion.GetToken, { userId: user.id })

          if (refreshTokenFromRedis.toString()) {
            const refreshToken = refreshTokenFromRedis.toString()
            const tokenPayload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
            const accessToken = jwt.sign(tokenPayload, this.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "5m" })
            return { accessToken, refreshToken, user, success: true }
          }

          else {
            const tokenPayload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
            const accessToken = jwt.sign(tokenPayload, this.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "5m" })
            const refreshToken = `rt_as-${randomUUID()}`
            await this.eventEmitter.emitAsync(EventsUnion.SetToken, { userId: user.id, token: refreshToken })
            return { accessToken, refreshToken, user, success: true }
          }
        }

        else {
          const newUser = await this.commandBus.execute<CreateUserCommand, User>(new CreateUserCommand(email, name, 100))
          const organization: Organization[] = await this.eventEmitter.emitAsync(EventsUnion.CreateOrg, { name: "Default Org", userId: newUser.id })
          await this.commandBus.execute<UpdateAttributeCommand, User>(new UpdateAttributeCommand(newUser.id, AttributeNames.SelectedOrgId, organization[0].id))
          const tokenPayload = { id: newUser.id, email: newUser.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(tokenPayload, this.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "5m" })
          const refreshToken = `rt_as-${randomUUID()}`
          await this.eventEmitter.emitAsync(EventsUnion.SetToken, { userId: newUser.id, token: refreshToken })
          return { accessToken, refreshToken, user: newUser, success: true }
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
        return { user, organization }
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
      await this.eventEmitter.emitAsync(EventsUnion.DeleteToken, { userId })
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateAttribute(userId: string, attributeName: AttributeNames, attributeValue: string) {
    try {
      await this.commandBus.execute<UpdateAttributeCommand, User>(new UpdateAttributeCommand(userId, attributeName, attributeValue))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
