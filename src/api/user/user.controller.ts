import { Controller, Post, Body, UnauthorizedException, BadRequestException } from "@nestjs/common"
import { UserService } from "./user.service"
import { RequestAuthCodeDto } from "./dto/request-auth-code.dto"
import { VerifyAuthCodeDto } from "./dto/verify-auth-code.dto"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/requestauthcode")
  async requestAuthCode(@Body() requestAuthCodeDto: RequestAuthCodeDto) {
    try {
      const { user, hash } = await this.userService.requestAuthCode(requestAuthCodeDto)

      if (user) {
        return { hash, newuser: false, message: statusMessages.authCodeEmail }
      }

      else {
        return { hash, newuser: true, message: statusMessages.authCodeEmail }
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("/verifyauthcode")
  async verifyAuthCode(@Body() verifyAuthCodeDto: VerifyAuthCodeDto) {
    try {
      const response = await this.userService.verifyAuthCode(verifyAuthCodeDto)

      if (response.success) {
        return { accessToken: response.accessToken, user: response.user }
      }

      else {
        throw new BadRequestException(statusMessages.invalidAuthCode)
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
        throw new UnauthorizedException(statusMessages.unauthorized)
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
