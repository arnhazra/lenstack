import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateIdentityPasskeyDto } from "./dto/generate-identity-passkey.dto"
import { VerifyIdentityPasskeyDto } from "./dto/verify-identity-passkey.dto"
import * as jwt from "jsonwebtoken"
import Web3 from "web3"
import { envConfig } from "src/config/env.config"
import { generateIdentityPasskeyAndSendEmail, verifyIdentityPasskey } from "src/utils/passkey-tool"
import { UserRepository } from "./user.repository"
import { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis } from "src/utils/redis-helper"
import { otherConstants } from "src/constants/other-constants"
import { SubscriptionModel } from "../subscription/entities/subscription.entity"
import { statusMessages } from "src/constants/status-messages"
import { WorkspaceModel } from "../workspace/entities/workspace.entity"
import { WorkspaceRepository } from "../workspace/workspace.repository"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string
  private readonly web3Provider: Web3

  constructor(private readonly userRepository: UserRepository, private readonly workspaceRepository: WorkspaceRepository, private readonly httpService: HttpService) {
    this.authPrivateKey = envConfig.authPrivateKey
    this.web3Provider = new Web3(envConfig.infuraGateway)
  }

  async generateIdentityPasskey(generateIdentityPasskeyDto: GenerateIdentityPasskeyDto) {
    try {
      const { email } = generateIdentityPasskeyDto
      let user = await this.userRepository.findUserByEmail(email)
      const hash = await generateIdentityPasskeyAndSendEmail(email)
      return { user, hash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyIdentityPasskey(verifyIdentityPasskeyDto: VerifyIdentityPasskeyDto) {
    try {
      const { email, hash, passKey } = verifyIdentityPasskeyDto
      const isOTPValid = verifyIdentityPasskey(email, hash, passKey)

      if (isOTPValid) {
        let user = await this.userRepository.findUserByEmail(email)

        if (user) {
          const redisAccessToken = await getTokenFromRedis(user.id)
          const workspaceCount = (await this.workspaceRepository.findMyWorkspaces(user.id)).length

          if (!workspaceCount) {
            const workspace = await this.workspaceRepository.createWorkspace("Default Workspace", user.id)
            await this.userRepository.findUserByIdAndUpdateSelectedWorkspace(user.id, workspace.id)
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
          const newUser = await this.userRepository.createNewUser({ email, privateKey })
          const workspace = await this.workspaceRepository.createWorkspace("Default Workspace", newUser.id)
          await this.userRepository.findUserByIdAndUpdateSelectedWorkspace(newUser.id, workspace.id)
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
      const user = await this.userRepository.findUserById(userId)

      if (user) {
        const subscription = await SubscriptionModel.findOne({ workspaceId })
        const workspace = await WorkspaceModel.findById(workspaceId)
        return { user, subscription, workspace }
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

  async signTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
