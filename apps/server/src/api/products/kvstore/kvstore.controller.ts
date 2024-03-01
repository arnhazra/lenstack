import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, Get } from "@nestjs/common"
import { KvstoreService } from "./kvstore.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/kvstore")
export class KvstoreController {
  constructor(private readonly kvstoreService: KvstoreService) { }

  @Post("createkv")
  async createKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createKvDto: CreateKvDto) {
    try {
      return await this.kvstoreService.createKv(ufc.workspaceId, createKvDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("readkvlistfromplatform")
  async readKvListInsidePlatform(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const { kvs } = await this.kvstoreService.readKvList(uft.workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Get("readkvlist")
  async readKvListOutsidePlatform(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      const { kvs } = await this.kvstoreService.readKvList(ufc.workspaceId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Query("kvId") kvId: string) {
    try {
      return await this.kvstoreService.deleteKv(ufc.workspaceId, kvId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
