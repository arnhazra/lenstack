import { BadRequestException, Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/env.config"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { findGatewayFilters } from "./queries/find-gateway-filters.query"
import { findChainFilters } from "./queries/find-chain-filters.query"
import { findNetworkFilters } from "./queries/find-network-filters.query"
import { findNetworksQuery } from "./queries/find-networks.query"
import { findNetworkDetailsById } from "./queries/find-network-by-id.query"

@Injectable()
export class BlockchainService {
  constructor(private readonly httpService: HttpService) { }

  async getGatewayFilters() {
    try {
      const filters = await findGatewayFilters()
      return filters
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getChainFilters() {
    try {
      const filters = await findChainFilters()
      return filters
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getNetworkFilters() {
    try {
      const filters = await findNetworkFilters()
      return filters
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findNetworks(findNetworksDto: FindNetworksDto) {
    try {
      const searchQuery = findNetworksDto.searchQuery || ""
      const selectedChainFilter = findNetworksDto.selectedChainFilter === "All" ? "" : findNetworksDto.selectedChainFilter
      const selectedGatewayFilter = findNetworksDto.selectedGatewayFilter === "All" ? "" : findNetworksDto.selectedGatewayFilter
      const selectedNetworkFilter = findNetworksDto.selectedNetworkFilter === "All" ? "" : findNetworksDto.selectedNetworkFilter
      const networks = await findNetworksQuery(searchQuery, selectedChainFilter, selectedGatewayFilter, selectedNetworkFilter)
      return networks
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewNetwork(networkId: string) {
    try {
      const network = await findNetworkDetailsById(networkId)
      return network
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async transactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
