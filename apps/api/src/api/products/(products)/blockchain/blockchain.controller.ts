import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService, private readonly eventEmitter: EventEmitter2) { }

  @Post("gateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "POST", api: "/txgateway" })
      const response = await this.blockchainService.transactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
