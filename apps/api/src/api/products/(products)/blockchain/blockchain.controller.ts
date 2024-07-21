import { Controller, Post, Body, BadRequestException, Get, Query } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { FindNetworksDto } from "./dto/find-networks.dto"

@Controller("products/blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService, private readonly eventEmitter: EventEmitter2) { }

  @Get("gatewayfilters")
  async getGatewayFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "GET", api: "/gatewayfilters" })
      const gatewayFilters = await this.blockchainService.getGatewayFilters()
      return { gatewayFilters }
    }

    catch (error) {
      throw error
    }
  }

  @Get("networkfilters")
  async getNetworkFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "GET", api: "/networkfilters" })
      const networkFilters = await this.blockchainService.getNetworkFilters()
      return { networkFilters }
    }

    catch (error) {
      throw error
    }
  }

  @Post("findnetworks")
  async findNetworks(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() findNetworksDto: FindNetworksDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "POST", api: "/findnetworks" })
      const networks = await this.blockchainService.findNetworks(findNetworksDto)
      return { networks }
    }

    catch (error) {
      throw error
    }
  }

  @Get("viewnetwork")
  async viewNetwork(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("networkId") networkId: string) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "GET", api: "/viewnetwork" })
      const data = await this.blockchainService.viewNetwork(networkId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("gateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/blockchain", method: "POST", api: "/gateway" })
      const response = await this.blockchainService.transactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
