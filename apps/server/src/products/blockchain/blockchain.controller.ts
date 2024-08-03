import { Controller, Post, Body, BadRequestException, Get, Param, UseGuards, Request } from "@nestjs/common"
import { BlockchainService } from "./blockchain.service"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"
import { CredentialGuard } from "src/auth/credential.guard"

@Controller("products/blockchain")
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) { }

  @UseGuards(TokenGuard)
  @Get("gatewayfilters")
  async getGatewayFilters() {
    try {
      return await this.blockchainService.getGatewayFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("networkfilters")
  async getNetworkFilters() {
    try {
      return await this.blockchainService.getNetworkFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("findnetworks")
  async findNetworks(@Body() findNetworksDto: FindNetworksDto) {
    try {
      return await this.blockchainService.findNetworks(findNetworksDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("viewnetwork/:networkId")
  async viewNetwork(@Param() params: any) {
    try {
      return await this.blockchainService.viewNetwork(params.networkId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(CredentialGuard)
  @Post("gateway/:networkId")
  async transactionGateway(@Body() requestBody: any, @Param() params: any) {
    try {
      const response = await this.blockchainService.transactionGateway(requestBody, String(params.networkId))
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
