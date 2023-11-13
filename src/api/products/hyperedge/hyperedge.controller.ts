import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { HyperedgeService } from "./hyperedge.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerReturnType } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("hyperedge")
export class HyperedgeController {
  constructor(private readonly hyperedgeService: HyperedgeService) { }

  @Post("createdb")
  async createDb(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body() createDbDto: CreateDbDto) {
    try {
      const db = await this.hyperedgeService.createDb(uft.workspaceId, createDbDto)
      return { db }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getmydbs")
  async getMyDbs(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("searchQuery") searchQuery: string) {
    try {
      const dbs = await this.hyperedgeService.getMyDbs(uft.workspaceId, searchQuery)
      return { dbs }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewdbfromplatform")
  async viewDbInsidePlatform(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("dbId") dbId: string) {
    try {
      const { db, kvs } = await this.hyperedgeService.viewDb(uft.workspaceId, dbId)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Post("viewdb")
  async viewDbOutsidePlatform(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Body("dbId") dbId: string, @Body("dbPassword") dbPassword: string) {
    try {
      const { db, kvs } = await this.hyperedgeService.viewDbOutsidePlatform(ufak.workspaceId, dbId, dbPassword)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletedb")
  async deleteDb(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Query("dbId") dbId: string) {
    try {
      await this.hyperedgeService.deleteDb(uft.workspaceId, dbId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createkv")
  async createKv(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Body() createKvDto: CreateKvDto) {
    try {
      await this.hyperedgeService.createKv(ufak.workspaceId, createKvDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Query("kvId") kvId: string) {
    try {
      await this.hyperedgeService.deleteKv(ufak.workspaceId, kvId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
