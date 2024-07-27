import { Controller, Post, Body, BadRequestException, Get, Patch } from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/auth/token-authorizer.decorator"
import { UpdateCarbonSettingsDto } from "./dto/update-carbon-settings.dto"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly eventEmitter: EventEmitter2) { }

  @Post("generatepasskey")
  async generateAuthPasskey(@Body() generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { hash } = await this.userService.generateAuthPasskey(generateAuthPasskeyDto)
      return { hash, message: statusMessages.passKeyEmail }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("verifypasskey")
  async verifyAuthPasskey(@Body() verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const response = await this.userService.verifyAuthPasskey(verifyAuthPasskeyDto)

      if (response.success) {
        this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: response.user._id, module: "user", method: "POST", api: "/verifypasskey" })
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
  async getUserDetails(@TokenAuthorizer() userT: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: userT.userId, module: "user", method: "GET", api: "/userdetails" })
      const { user, subscription, organization, hasActiveSubscription } = await this.userService.getUserDetails(userT.userId, userT.orgId)

      if (user) {
        return { user, subscription, organization, hasActiveSubscription }
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
  async signOut(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "user", method: "POST", api: "/signout" })
      await this.userService.signOut(user.userId)
      return { message: statusMessages.signOutSuccess }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Patch("updatecarbonsettings")
  async updateCarbonSettings(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() updateCarbonSettingsDto: UpdateCarbonSettingsDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "user", method: "PATCH", api: "/updatecarbonsettings" })
      return await this.userService.updateCarbonSettings(user.userId, updateCarbonSettingsDto.reduceCarbonEmissions)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
