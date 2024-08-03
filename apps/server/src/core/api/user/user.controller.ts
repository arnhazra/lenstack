import { Controller, Post, Body, BadRequestException, Get, Patch, Request, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { UpdateCarbonSettingsDto } from "./dto/update-carbon-settings.dto"
import { ChangeUsageInsightsSettingsDto } from "./dto/change-usage-insights.dto"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("generatepasskey")
  async generatePasskey(@Body() generateAuthPasskeyDto: GenerateAuthPasskeyDto) {
    try {
      const { hash } = await this.userService.generatePasskey(generateAuthPasskeyDto)
      return { hash, message: statusMessages.passKeyEmail }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("verifypasskey")
  async verifyPasskey(@Body() verifyAuthPasskeyDto: VerifyAuthPasskeyDto) {
    try {
      const response = await this.userService.verifyPasskey(verifyAuthPasskeyDto)

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

  @UseGuards(TokenGuard)
  @Get("userdetails")
  async getUserDetails(@Request() request: ModRequest) {
    try {
      const { user, subscription, organization, hasActiveSubscription } = await this.userService.getUserDetails(request.user.userId, request.user.orgId)

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

  @UseGuards(TokenGuard)
  @Post("signout")
  async signOut(@Request() request: ModRequest) {
    try {
      await this.userService.signOut(request.user.userId)
      return { message: statusMessages.signOutSuccess }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(TokenGuard)
  @Patch("updatecarbonsettings")
  async updateCarbonSettings(@Request() request: ModRequest, @Body() updateCarbonSettingsDto: UpdateCarbonSettingsDto) {
    try {
      return await this.userService.updateCarbonSettings(request.user.userId, updateCarbonSettingsDto.reduceCarbonEmissions)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }

  @UseGuards(TokenGuard)
  @Patch("changeusageinsights")
  async changeUsageInsightsSettings(@Request() request: ModRequest, @Body() changeUsageInsightsSettingsDto: ChangeUsageInsightsSettingsDto) {
    try {
      return await this.userService.changeUsageInsightsSettings(request.user.userId, changeUsageInsightsSettingsDto.usageInsights)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
