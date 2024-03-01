import { Controller, Post, Body, BadRequestException, Get } from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateIdentityPasskeyDto } from "./dto/generate-identity-passkey.dto"
import { VerifyIdentityPasskeyDto } from "./dto/verify-identity-passkey.dto"
import { statusMessages } from "src/constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("generatepasskey")
  async generateIdentityPasskey(@Body() generateIdentityPasskeyDto: GenerateIdentityPasskeyDto) {
    try {
      const { hash } = await this.userService.generateIdentityPasskey(generateIdentityPasskeyDto)
      return { hash, message: statusMessages.passKeyEmail }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("verifypasskey")
  async verifyIdentityPasskey(@Body() verifyIdentityPasskeyDto: VerifyIdentityPasskeyDto) {
    try {
      const response = await this.userService.verifyIdentityPasskey(verifyIdentityPasskeyDto)

      if (response.success) {
        return { accessToken: response.accessToken, user: response.user }
      }

      else {
        throw new BadRequestException(statusMessages.invalidPassKey)
      }
    }

    catch (error) {
      throw error
    }
  }

  @Get("userdetails")
  async getUserDetails(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const { user, subscription, workspace, hasActiveSubscription } = await this.userService.getUserDetails(uft.userId, uft.workspaceId)

      if (user) {
        return { user, subscription, workspace, hasActiveSubscription }
      }

      else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }

  @Post("signout")
  async signOut(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      await this.userService.signOut(uft.userId)
      return { message: statusMessages.signOutSuccess }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("txgateway")
  async transactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.userService.transactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
