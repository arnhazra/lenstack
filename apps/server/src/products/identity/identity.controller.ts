import { Controller, Post, Body, BadRequestException, Get, Request, UseGuards, UnauthorizedException } from "@nestjs/common"
import { IdentityService } from "./identity.service"
import { GenerateAuthPasskeyDto } from "./dto/generate-auth-passkey.dto"
import { VerifyAuthPasskeyDto } from "./dto/verify-auth-passkey.dto"
import { statusMessages } from "src/utils/constants/status-messages"
import { ModRequest } from "src/auth/types/mod-request.interface"
import { CredentialGuard } from "src/auth/credential.guard"

@Controller("products/identity")
export class IdentityController {
  constructor(private readonly userService: IdentityService) { }

  @UseGuards(CredentialGuard)
  @Post("generatepasskey")
  async generatePasskey(@Body() generateAuthPasskeyDto: GenerateAuthPasskeyDto, @Request() request: ModRequest) {
    try {
      const { hash } = await this.userService.generatePasskey(generateAuthPasskeyDto, request.user.orgId)
      return { hash, message: statusMessages.passKeyEmail }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @UseGuards(CredentialGuard)
  @Post("verifypasskey")
  async verifyPasskey(@Body() verifyAuthPasskeyDto: VerifyAuthPasskeyDto, @Request() request: ModRequest) {
    try {
      const response = await this.userService.verifyPasskey(verifyAuthPasskeyDto, request.user.orgId)
      const { accessToken, user } = response

      if (response.success) {
        return { accessToken, user }
      }

      else {
        throw new BadRequestException(statusMessages.invalidPassKey)
      }
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Get("getallusers")
  async getAllUsers(@Request() request: ModRequest) {
    try {
      return await this.userService.getAllUsers(request.user.orgId)
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Get("userdetails")
  async getUserDetails(@Request() request: ModRequest) {
    try {
      const accessToken = request.headers.authorization?.split(" ")[1]

      if (!accessToken) {
        throw new UnauthorizedException(statusMessages.unauthorized)
      }

      const user = await this.userService.getUserDetails(accessToken, request.user.orgId)

      if (user) {
        return user
      }

      else {
        throw new BadRequestException(statusMessages.invalidUser)
      }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.invalidUser)
    }
  }
}
