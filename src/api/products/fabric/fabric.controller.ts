import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { FabricService } from "./fabric.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { SearchDbsDto } from "./dto/search-dbs.dto"
import { ViewDbTokenDto } from "./dto/view-db-token.dto"
import { ViewDbApiKeyDto } from "./dto/view-db-apikey.dto"

@Controller("products/fabric")
export class FabricController {
  constructor(private readonly fabricService: FabricService) { }

  @Post("createdb")
  async createDb(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() createDbDto: CreateDbDto) {
    try {
      const db = await this.fabricService.createDb(uft.workspaceId, createDbDto)
      return { db }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getmydbs")
  async getMyDbs(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchDbsDto: SearchDbsDto) {
    try {
      const { searchQuery } = searchDbsDto
      const dbs = await this.fabricService.getMyDbs(uft.workspaceId, searchQuery)
      return { dbs }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewdbfromplatform")
  async viewDbInsidePlatform(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() viewDbTokenDto: ViewDbTokenDto) {
    try {
      const { dbId } = viewDbTokenDto
      const { db, kvs } = await this.fabricService.viewDb(uft.workspaceId, dbId)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Post("viewdb")
  async viewDbOutsidePlatform(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Body() viewDbApiKeyDto: ViewDbApiKeyDto) {
    try {
      const { dbId, dbPassword } = viewDbApiKeyDto
      const { db, kvs } = await this.fabricService.viewDbOutsidePlatform(ufak.workspaceId, dbId, dbPassword)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletedb")
  async deleteDb(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("dbId") dbId: string) {
    try {
      await this.fabricService.deleteDb(uft.workspaceId, dbId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createkv")
  async createKv(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Body() createKvDto: CreateKvDto) {
    try {
      await this.fabricService.createKv(ufak.workspaceId, createKvDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Query("kvId") kvId: string) {
    try {
      await this.fabricService.deleteKv(ufak.workspaceId, kvId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
