import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import * as jwt from "jsonwebtoken"
import Web3 from "web3"
import { envConfig } from "src/env.config"
import { generateAuthPasskeyAndSendEmail, verifyAuthPasskey } from "src/api/user/utils/passkey.util"
import { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis } from "src/lib/redis-helper"
import { otherConstants } from "src/constants/other-constants"
import { statusMessages } from "src/constants/status-messages"
import { findWorkspaceByIdQuery } from "../workspace/queries/find-workspace-by-id.query"
import { createWorkspaceCommand } from "../workspace/commands/create-workspace.command"
import { findMyWorkspacesQuery } from "../workspace/queries/find-workspaces.query"
import { findSubscriptionByUserIdQuery } from "../subscription/queries/find-subscription"
import { findUserByEmailQuery } from "./queries/find-user-by-email"
import { updateSelectedWorkspaceCommand } from "./commands/update-selected-workspace.command"
import { createUserCommand } from "./commands/create-user.command"
import { findUserByIdQuery } from "./queries/find-user-by-id"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"
import createSustainabilitySettingsCommand from "../sustainability/commands/create-settings.command"
import fetchSustainabilitySettings from "../sustainability/queries/fetch-sustainability-settings.query"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string
  private readonly web3Provider: Web3

  constructor(private readonly httpService: HttpService) {
    this.authPrivateKey = envConfig.authPrivateKey
    this.web3Provider = new Web3(envConfig.alchemyGateway)
  }

  async generateAuthPasskey(generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { email } = generateAuthPasskeyDto
      let user = await findUserByEmailQuery(email)
      const hash = await generateAuthPasskeyAndSendEmail(email)
      return { user, hash }
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
          const workspaceCount = (await findMyWorkspacesQuery(user.id)).length

          if (!workspaceCount) {
            const workspace = await createWorkspaceCommand("Default Workspace", user.id)
            await updateSelectedWorkspaceCommand(user.id, workspace.id)
            await createSustainabilitySettingsCommand(user.id, false, true)
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
          const { privateKey } = this.web3Provider.eth.accounts.create()
          const newUser = await createUserCommand(email, privateKey)
          const workspace = await createWorkspaceCommand("Default Workspace", newUser.id)
          await updateSelectedWorkspaceCommand(newUser.id, workspace.id)
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

  async getUserDetails(userId: string, workspaceId: string) {
    try {
      const user = await findUserByIdQuery(userId)

      if (user) {
        const workspace = await findWorkspaceByIdQuery(workspaceId)
        const subscription = await findSubscriptionByUserIdQuery(userId)
        const sustainabilitySettings = await fetchSustainabilitySettings(userId)
        let hasActiveSubscription = false

        if (subscription && subscription.expiresAt > new Date() && subscription.remainingCredits > 0) {
          hasActiveSubscription = true
        }

        return { user, workspace, subscription, hasActiveSubscription, sustainabilitySettings }
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

  async transactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      console.log(error)
      throw new BadRequestException()
    }
  }
}
