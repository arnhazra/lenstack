import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, ForbiddenException } from "@nestjs/common"
import { VuelockService } from "./vuelock.service"
import { CreateSecretDto } from "./dto/create-secret.dto"
import { CreateVaultDto } from "./dto/create-vault.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("Vuelock")
export class VuelockController {
  constructor(private readonly vuelockService: VuelockService) { }

  @Post("createvault")
  async createVault(@TokenAuthorizer() userId: string, @Body() createVaultDto: CreateVaultDto) {
    try {
      const vault = await this.vuelockService.createVault(userId, createVaultDto)
      return { vault }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getmyvaults")
  async getMyVaults(@TokenAuthorizer() userId: string) {
    try {
      const vaults = await this.vuelockService.getMyVaults(userId)
      return { vaults }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewvault")
  async viewVault(@ApiKeyAuthorizer() userId: string, @Query("vaultId") vaultId: string) {
    try {
      const { vault, secrets } = await this.vuelockService.viewVault(userId, vaultId)
      return { vault, secrets }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletevault")
  async deleteVault(@TokenAuthorizer() userId: string, @Query("vaultId") vaultId: string) {
    try {
      await this.vuelockService.deleteVault(userId, vaultId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createsecret")
  async createSecret(@ApiKeyAuthorizer() userId: string, @Body() createSecretDto: CreateSecretDto) {
    try {
      await this.vuelockService.createSecret(userId, createSecretDto)
      return true
    }

    catch (error) {
      throw new ForbiddenException()
    }
  }

  @Delete("deletesecret")
  async deleteSecret(@ApiKeyAuthorizer() userId: string, @Query("secretId") secretId: string) {
    try {
      await this.vuelockService.deleteSecret(userId, secretId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
