import { Controller, Post, Body, BadRequestException, Get, Param, UseGuards, Request } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { ModRequest, TokenGuard } from "src/auth/token.guard"

@Controller("products/blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) { }

  @UseGuards(TokenGuard)
  @Get("gatewayfilters")
  async getGatewayFilters(@Request() request: ModRequest) {
    try {
      return await this.blockchainService.getGatewayFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("networkfilters")
  async getNetworkFilters(@Request() request: ModRequest) {
    try {
      return await this.blockchainService.getNetworkFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("findnetworks")
  async findNetworks(@Request() request: ModRequest, @Body() findNetworksDto: FindNetworksDto) {
    try {
      return await this.blockchainService.findNetworks(findNetworksDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("viewnetwork/:networkId")
  async viewNetwork(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.blockchainService.viewNetwork(params.networkId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/:networkId")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any, @Param() params: any) {
    try {
      const response = await this.blockchainService.transactionGateway(requestBody, String(params.networkId))
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
