import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { RequestAuthCodeDto } from "./dto/request-auth-code.dto"
import * as jwt from "jsonwebtoken"
import Web3 from "web3"
import { VerifyAuthCodeDto } from "./dto/verify-auth-code.dto"
import { envConfig } from "src/config/envConfig"
import { createAuthCodeAndSendEmail, verifyAuthCode } from "src/utils/otpTool"
import { UserRepository } from "./user.repository"
import { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis } from "src/utils/redisHelper"
import { otherConstants } from "src/constants/otherConstants"
import { MasterSubscriptionModel } from "../subscription/entities/subscription.entity"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class UserService {
  private readonly authPrivateKey: string
  private readonly infuraEndpoint: string
  private readonly web3Provider: Web3

  constructor(private readonly userRepository: UserRepository) {
    this.authPrivateKey = envConfig.authPrivateKey
    this.infuraEndpoint = otherConstants.infuraEndpoint + "/" + envConfig.infuraApiKey
    this.web3Provider = new Web3(this.infuraEndpoint)
  }

  async requestAuthCode(requestAuthCodeDto: RequestAuthCodeDto) {
    try {
      const { email } = requestAuthCodeDto
      let user = await this.userRepository.findUserByEmail(email)
      const hash = await createAuthCodeAndSendEmail(email)
      return { user, hash }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async verifyAuthCode(verifyAuthCodeDto: VerifyAuthCodeDto) {
    try {
      const { name, email, hash, otp, privateKey } = verifyAuthCodeDto
      const isOTPValid = verifyAuthCode(email, hash, otp)

      if (isOTPValid) {
        let user = await this.userRepository.findUserByEmail(email)

        if (user) {
          const redisAccessToken = await getTokenFromRedis(user.id)
          if (redisAccessToken) {
            const accessToken = redisAccessToken
            return { accessToken, newUser: false, success: true, user }
          }

          else {
            const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
            const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
            await setTokenInRedis(user.id, accessToken)
            return { accessToken, newUser: false, success: true, user }
          }
        }

        else {
          const { privateKey } = this.web3Provider.eth.accounts.create()
          await this.userRepository.createNewUser({ email, name, privateKey })
          const payload = { id: user.id, email: user.email, iss: otherConstants.tokenIssuer }
          const accessToken = jwt.sign(payload, this.authPrivateKey, { algorithm: "RS512" })
          await setTokenInRedis(user.id, accessToken)
          return { accessToken, newUser: true, success: true, user }
        }
      }

      else {
        throw new BadRequestException(statusMessages.connectionError)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async getUserDetails(userId: string) {
    try {
      const user = await this.userRepository.findUserById(userId)
      if (user) {
        const userId = user.id
        const subscription = await MasterSubscriptionModel.findOne({ owner: userId })
        return { user, subscription }
      }

      else {
        throw new UnauthorizedException(statusMessages.invalidUser)
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
