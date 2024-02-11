import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { FabricService } from "./fabric.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/fabric")
export class FabricController {
  constructor(private readonly fabricService: FabricService) { }

  @Post("createkv")
  async createKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createKvDto: CreateKvDto) {
    try {
      return await this.fabricService.createKv(ufc.workspaceId, createKvDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewdbfromplatform")
  async viewDbInsidePlatform(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const { kvs } = await this.fabricService.readKvList(uft.workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Post("viewdb")
  async viewDbOutsidePlatform(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      const { kvs } = await this.fabricService.readKvList(ufc.workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Query("kvId") kvId: string) {
    try {
      return await this.fabricService.deleteKv(ufc.workspaceId, kvId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
