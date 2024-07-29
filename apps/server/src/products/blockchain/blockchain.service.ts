import { BadRequestException, Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { QueryBus } from "@nestjs/cqrs"
import { FindGatewayFiltersQuery } from "./queries/impl/find-gateway-filters.query"
import { FindNetworkFiltersQuery } from "./queries/impl/find-netowork-filters.query"
import { FindNetworksQuery } from "./queries/impl/find-netoworks.query"
import { FindNetworkByIdQuery } from "./queries/impl/find-netowork-by-id.query"

@Injectable()
export class BlockchainService {
  constructor(private readonly httpService: HttpService, private readonly queryBus: QueryBus) { }

  async getGatewayFilters() {
    try {
      const filters = await this.queryBus.execute(new FindGatewayFiltersQuery())
      return filters
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getNetworkFilters() {
    try {
      const filters = await this.queryBus.execute(new FindNetworkFiltersQuery())
      return filters
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findNetworks(findNetworksDto: FindNetworksDto) {
    try {
      const searchQuery = findNetworksDto.searchQuery || ""
      const selectedGatewayFilter = findNetworksDto.selectedGatewayFilter === "All" ? "" : findNetworksDto.selectedGatewayFilter
      const selectedNetworkFilter = findNetworksDto.selectedNetworkFilter === "All" ? "" : findNetworksDto.selectedNetworkFilter
      const networks = await this.queryBus.execute(new FindNetworksQuery(searchQuery, selectedGatewayFilter, selectedNetworkFilter))
      return networks
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewNetwork(networkId: string) {
    try {
      const network = await this.queryBus.execute(new FindNetworkByIdQuery(networkId))
      return network
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async transactionGateway(requestBody: any, networkId: string) {
    try {
      const network = await this.queryBus.execute(new FindNetworkByIdQuery(networkId))
      const { rpcProviderUri } = network
      const response = await lastValueFrom(this.httpService.post(rpcProviderUri, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
