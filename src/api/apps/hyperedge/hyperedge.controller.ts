import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException } from "@nestjs/common"
import { HyperedgeService } from "./hyperedge.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CreateDbDto } from "./dto/create-db.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("hyperedge")
export class HyperedgeController {
  constructor(private readonly hyperedgeService: HyperedgeService) { }

  @Post("createdb")
  async createDb(@TokenAuthorizer() userId: string, @Body() createDbDto: CreateDbDto) {
    try {
      const db = await this.hyperedgeService.createDb(userId, createDbDto)
      return { db }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getmydbs")
  async getMyDbs(@TokenAuthorizer() userId: string) {
    try {
      const dbs = await this.hyperedgeService.getMyDbs(userId)
      return { dbs }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("viewdbfromplatform")
  async viewDbInsidePlatform(@TokenAuthorizer() userId: string, @Body("dbId") dbId: string) {
    try {
      const { db, kvs } = await this.hyperedgeService.viewDb(userId, dbId)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Post("viewdb")
  async viewDbOutsidePlatform(@ApiKeyAuthorizer() userId: string, @Body("dbId") dbId: string, @Body("dbPassword") dbPassword: string) {
    try {
      const { db, kvs } = await this.hyperedgeService.viewDbOutsidePlatform(userId, dbId, dbPassword)
      return { db, kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletedb")
  async deleteDb(@TokenAuthorizer() userId: string, @Query("dbId") dbId: string) {
    try {
      await this.hyperedgeService.deleteDb(userId, dbId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createkv")
  async createKv(@ApiKeyAuthorizer() userId: string, @Body() createKvDto: CreateKvDto) {
    try {
      await this.hyperedgeService.createKv(userId, createKvDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@ApiKeyAuthorizer() userId: string, @Query("kvId") kvId: string) {
    try {
      await this.hyperedgeService.deleteKv(userId, kvId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
