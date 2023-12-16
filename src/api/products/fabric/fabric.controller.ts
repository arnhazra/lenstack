import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, Get } from "@nestjs/common"
import { FabricService } from "./fabric.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { ViewDbTokenDto } from "./dto/view-db-token.dto"
import { ViewDbCredentialDto } from "./dto/view-db-credential.dto"

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

  @Get("getmydbs")
  async getMyDbs(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("searchQuery") searchQuery: string) {
    try {
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
  async viewDbOutsidePlatform(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() viewDbCredentialDto: ViewDbCredentialDto) {
    try {
      const { dbId, dbPassword } = viewDbCredentialDto
      const { db, kvs } = await this.fabricService.viewDbOutsidePlatform(ufc.workspaceId, dbId, dbPassword)
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
  async createKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() createKvDto: CreateKvDto) {
    try {
      await this.fabricService.createKv(ufc.workspaceId, createKvDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Query("kvId") kvId: string) {
    try {
      await this.fabricService.deleteKv(ufc.workspaceId, kvId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
