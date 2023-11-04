import { BadRequestException, Injectable } from "@nestjs/common"
import { GenerateIdentityPasskeyDto } from "./dto/generate-identity-passkey.dto"
import { VerifyIdentityPasskeyDto } from "./dto/verify-identity-passkey.dto"
import * as jwt from "jsonwebtoken"
import Web3 from "web3"
import { envConfig } from "src/config/envConfig"
import { generateIdentityPasskeyAndSendEmail, verifyIdentityPasskey } from "src/utils/passKeyTool"
import { UserRepository } from "./user.repository"
import { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis } from "src/utils/redisHelper"
import { otherConstants } from "src/constants/otherConstants"
import { SubscriptionModel } from "../subscription/entities/subscription.entity"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string
  private readonly infuraEndpoint: string
  private readonly web3Provider: Web3

  constructor(private readonly userRepository: UserRepository) {
    this.authPrivateKey = envConfig.authPrivateKey
    this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraSecret
    this.web3Provider = new Web3(this.infuraEndpoint)
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

  async getUserDetails(userId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)
      if (user) {
        const userId = user.id
        const subscription = await SubscriptionModel.findOne({ owner: userId })

        if (subscription) {
          const currentDate = new Date()
          const expiryDate = subscription.expiresAt

          if (currentDate > expiryDate) {
            await SubscriptionModel.findOneAndDelete({ owner: userId })
          }
        }

        return { user, subscription }
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
}
