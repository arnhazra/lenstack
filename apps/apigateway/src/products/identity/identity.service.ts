import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import * as jwt from "jsonwebtoken"
import { envConfig } from "src/env.config"
import { generateAuthPasskey, verifyAuthPasskey, generatePasskeyEmailBody, generatePasskeyEmailSubject } from "./identity.util"
import { otherConstants } from "src/utils/constants/other-constants"
import { statusMessages } from "src/utils/constants/status-messages"
import { EventsUnion, ServiceUnion } from "src/utils/events.union"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindUserByEmailQuery } from "./queries/impl/find-user-by-email.query"
import { User } from "./schemas/user.schema"
import { FindUserByIdQuery } from "./queries/impl/find-user-by-id.query"
import { CreateUserCommand } from "./commands/impl/create-user.command"
import { FindUsersByOrgQuery } from "./queries/impl/find-users-by-org.query"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class IdentityService {
  private readonly accessTokenPrivateKey: string

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @Inject(ServiceUnion.EmailMicroService) private readonly emailClient: ClientProxy
  ) {
    this.accessTokenPrivateKey = envConfig.accessTokenPrivateKey
  }

  async generatePasskey(generateAuthPasskeyDto: GenerateAuthPasskeyDto, orgId: string) {
    try {
      const { email } = generateAuthPasskeyDto
      const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email, orgId))
      const { fullHash: hash, passKey } = generateAuthPasskey(email)
      const subject: string = generatePasskeyEmailSubject()
      const body: string = generatePasskeyEmailBody(passKey)
      this.emailClient.emit(EventsUnion.SendEmail, { email, subject, body })
      return { user, hash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyPasskey(verifyAuthPasskeyDto: VerifyAuthPasskeyDto, orgId: string) {
    try {
      const { email, hash, passKey } = verifyAuthPasskeyDto
      const isOTPValid = verifyAuthPasskey(email, hash, passKey)

      if (isOTPValid) {
        const user = await this.queryBus.execute<FindUserByEmailQuery, User>(new FindUserByEmailQuery(email, orgId))

        if (user) {
          const tokenPayload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(tokenPayload, this.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "24h" })
          return { accessToken, user, success: true }
        }

        else {
          const newUser = await this.commandBus.execute<CreateUserCommand, User>(new CreateUserCommand(email, orgId))
          const tokenPayload = { id: newUser.id, email: newUser.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(tokenPayload, this.accessTokenPrivateKey, { algorithm: "RS512", expiresIn: "5m" })
          await user.save()
          return { accessToken, user: newUser, success: true }
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

  async getUserDetails(accessToken: string, orgId: string) {
    try {
      const decodedAccessToken = jwt.verify(accessToken, envConfig.accessTokenPublicKey, { algorithms: ["RS512"] })
      const userId = (decodedAccessToken as any).id
      const user = await this.queryBus.execute<FindUserByIdQuery, User>(new FindUserByIdQuery(userId, orgId))

      if (user) {
        return user
      }

      else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async getAllUsers(orgId: string) {
    try {
      return await this.queryBus.execute<FindUsersByOrgQuery, User[]>(new FindUsersByOrgQuery(orgId))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
