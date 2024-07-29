import { Controller, Post, Body, BadRequestException, Get, Query, Param } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/auth/token-authorizer.decorator"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { EventsUnion } from "src/core/events/events.union"

@Controller("products/blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService, private readonly eventEmitter: EventEmitter2) { }

  @Get("gatewayfilters")
  async getGatewayFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/blockchain", method: "GET", api: "/gatewayfilters" })
      return await this.blockchainService.getGatewayFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("networkfilters")
  async getNetworkFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/blockchain", method: "GET", api: "/networkfilters" })
      return await this.blockchainService.getNetworkFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("findnetworks")
  async findNetworks(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() findNetworksDto: FindNetworksDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/blockchain", method: "POST", api: "/findnetworks" })
      return await this.blockchainService.findNetworks(findNetworksDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("viewnetwork")
  async viewNetwork(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("networkId") networkId: string) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/blockchain", method: "GET", api: "/viewnetwork" })
      return await this.blockchainService.viewNetwork(networkId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/:networkId")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any, @Param() params: any) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/blockchain", method: "POST", api: `/gateway/${String(params.networkId)}` })
      const response = await this.blockchainService.transactionGateway(requestBody, String(params.networkId))
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
