import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateOTPDto } from "./dto/generate-otp.dto"
import { VerifyOTPDto } from "./dto/validate-otp.dto"
import * as jwt from "jsonwebtoken"
import { envConfig } from "src/env.config"
import {
  generateOTP,
  verifyOTP,
  generateOTPEmailBody,
  generateOTPEmailSubject,
} from "./user.util"
import { tokenIssuer } from "src/shared/utils/constants/other-constants"
import { statusMessages } from "src/shared/utils/constants/status-messages"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/shared/utils/events.union"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { FindUserByEmailQuery } from "./queries/impl/find-user-by-email.query"
import { User } from "./schemas/user.schema"
import { FindUserByIdQuery } from "./queries/impl/find-user-by-id.query"
import { CreateUserCommand } from "./commands/impl/create-user.command"
import { Workspace } from "../workspace/schemas/workspace.schema"
import {
  AttributeNames,
  UpdateAttributeCommand,
} from "./commands/impl/update-attribute.command"
import { randomUUID } from "crypto"
import { Subscription } from "../subscription/schemas/subscription.schema"

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

  async generateOTP(generateOTPDto: GenerateOTPDto) {
    try {
      const { email } = generateOTPDto
      const user = await this.queryBus.execute<FindUserByEmailQuery, User>(
        new FindUserByEmailQuery(email)
      )
      const { fullHash: hash, otp } = generateOTP(email)
      const subject: string = generateOTPEmailSubject()
      const body: string = generateOTPEmailBody(otp)
      await this.eventEmitter.emitAsync(EventsUnion.SendEmail, {
        email,
        subject,
        body,
      })
      return { user, hash }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    try {
      const { email, hash, otp, name } = verifyOTPDto
      const isOTPValid = verifyOTP(email, hash, otp)

      if (isOTPValid) {
        const user = await this.queryBus.execute<FindUserByEmailQuery, User>(
          new FindUserByEmailQuery(email)
        )

        if (user) {
          const refreshTokenFromRedis = await this.eventEmitter.emitAsync(
            EventsUnion.GetToken,
            { userId: user.id }
          )

          if (user.selectedWorkspaceId === null) {
            const workspace: Workspace[] = await this.eventEmitter.emitAsync(
              EventsUnion.CreateWorkspace,
              {
                name: "Default Workspace",
                userId: user.id,
              }
            )
            await this.commandBus.execute<UpdateAttributeCommand, User>(
              new UpdateAttributeCommand(
                user.id,
                AttributeNames.selectedWorkspaceId,
                workspace[0].id
              )
            )
          }

          if (refreshTokenFromRedis.toString()) {
            const refreshToken = refreshTokenFromRedis.toString()
            const tokenPayload = {
              id: user.id,
              email: user.email,
              iss: tokenIssuer,
            }
            const accessToken = jwt.sign(
              tokenPayload,
              this.accessTokenPrivateKey,
              { algorithm: "RS512", expiresIn: "5m" }
            )
            return { accessToken, refreshToken, user, success: true }
          } else {
            const tokenPayload = {
              id: user.id,
              email: user.email,
              iss: tokenIssuer,
            }
            const accessToken = jwt.sign(
              tokenPayload,
              this.accessTokenPrivateKey,
              { algorithm: "RS512", expiresIn: "5m" }
            )
            const refreshToken = `rt_as-${randomUUID()}`
            await this.eventEmitter.emitAsync(EventsUnion.SetToken, {
              userId: user.id,
              token: refreshToken,
            })
            return { accessToken, refreshToken, user, success: true }
          }
        } else {
          const newUser = await this.commandBus.execute<
            CreateUserCommand,
            User
          >(new CreateUserCommand(email, name))
          const workspace: Workspace[] = await this.eventEmitter.emitAsync(
            EventsUnion.CreateWorkspace,
            {
              name: "Default Workspace",
              userId: newUser.id,
            }
          )
          await this.commandBus.execute<UpdateAttributeCommand, User>(
            new UpdateAttributeCommand(
              newUser.id,
              AttributeNames.selectedWorkspaceId,
              workspace[0].id
            )
          )
          const tokenPayload = {
            id: newUser.id,
            email: newUser.email,
            iss: tokenIssuer,
          }
          const accessToken = jwt.sign(
            tokenPayload,
            this.accessTokenPrivateKey,
            { algorithm: "RS512", expiresIn: "5m" }
          )
          const refreshToken = `rt_as-${randomUUID()}`
          await this.eventEmitter.emitAsync(EventsUnion.SetToken, {
            userId: newUser.id,
            token: refreshToken,
          })
          return { accessToken, refreshToken, user: newUser, success: true }
        }
      } else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async getUserDetails(userId: string, workspaceId: string) {
    try {
      const user = await this.queryBus.execute<FindUserByIdQuery, User>(
        new FindUserByIdQuery(userId)
      )

      if (user) {
        const workspaceResponse: Workspace[] =
          await this.eventEmitter.emitAsync(EventsUnion.GetWorkspaceDetails, {
            _id: workspaceId,
          })
        const subscriptionRes: Subscription[] =
          await this.eventEmitter.emitAsync(
            EventsUnion.GetSubscriptionDetails,
            userId
          )

        let subscription: Subscription | null

        if (!subscriptionRes || !subscriptionRes.length) {
          subscription = null
        } else {
          subscription = subscriptionRes[0]
        }

        const workspace = workspaceResponse[0]
        return { user, workspace, subscription }
      } else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async signOut(userId: string) {
    try {
      await this.eventEmitter.emitAsync(EventsUnion.DeleteToken, { userId })
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async updateAttribute(
    userId: string,
    attributeName: AttributeNames,
    attributeValue: string
  ) {
    try {
      await this.commandBus.execute<UpdateAttributeCommand, User>(
        new UpdateAttributeCommand(userId, attributeName, attributeValue)
      )
    } catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
