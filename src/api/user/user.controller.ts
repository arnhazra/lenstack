import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateIdentityPasskeyDto } from "./dto/generate-identity-passkey.dto"
import { VerifyIdentityPasskeyDto } from "./dto/verify-identity-passkey.dto"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/generatepasskey")
  async generateIdentityPasskey(@Body() generateIdentityPasskeyDto: GenerateIdentityPasskeyDto) {
    try {
      const { user, hash } = await this.userService.generateIdentityPasskey(generateIdentityPasskeyDto)

      if (user) {
        return { hash, newuser: false, message: statusMessages.passKeyEmail }
      }

      else {
        return { hash, newuser: true, message: statusMessages.passKeyEmail }
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("/verifypasskey")
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

  @Post("/userdetails")
  async getUserDetails(@TokenAuthorizer() userId: string) {
    try {
      const { user, subscription } = await this.userService.getUserDetails(userId)

      if (user) {
        return { user, subscription }
      }

      else {
        throw new BadRequestException(statusMessages.unauthorized)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.unauthorized)
    }
  }

  @Post("/signout")
  async signOut(@TokenAuthorizer() userId: string) {
    try {
      await this.userService.signOut(userId)
      return { message: statusMessages.signOutSuccess }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
