import { Controller, Post, BadRequestException, Get, Body } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("products/nftstudio")
export class NftstudioController {
  constructor(private readonly nftstudioService: NftstudioService, private readonly eventEmitter: EventEmitter2) { }

  @Post("txgateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/nftstudio", method: "POST", api: "/txgateway" })
      const response = await this.nftstudioService.transactionGateway(requestBody, user.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("getnftcontractaddress")
  getNftContractAddress(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/nftstudio", method: "GET", api: "/getnftcontractaddress" })
      return this.nftstudioService.getNftContractAddress()
    }

    catch (error) {
      throw error
    }
  }
}
