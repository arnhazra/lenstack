import { Controller, Post, Body, Delete, Query, BadRequestException, NotFoundException, Get } from "@nestjs/common"
import { KvstoreService } from "./kvstore.service"
import { CreateKvDto } from "./dto/create-kv.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("products/kvstore")
export class KvstoreController {
  constructor(private readonly kvstoreService: KvstoreService, private readonly eventEmitter: EventEmitter2) { }

  @Post("createkv")
  async createKv(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createKvDto: CreateKvDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/kvstore", method: "POST", api: "/createkv" })
      return await this.kvstoreService.createKv(user.orgId, createKvDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("readkv")
  async readKvList(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/kvstore", method: "GET", api: "/readkv" })
      const { kvs } = await this.kvstoreService.readKvList(user.orgId)
      return { kvs }
    }

    catch (error) {
      throw new NotFoundException()
    }
  }

  @Delete("deletekv")
  async deleteKv(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Query("kvId") kvId: string) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/kvstore", method: "DELETE", api: "/deletekv" })
      return await this.kvstoreService.deleteKv(user.orgId, kvId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
