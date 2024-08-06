import { BadRequestException, Injectable } from "@nestjs/common"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { QueryBus } from "@nestjs/cqrs"
import { FindGatewayFiltersQuery } from "./queries/impl/find-gateway-filters.query"
import { FindNetworkFiltersQuery } from "./queries/impl/find-netowork-filters.query"
import { FindNetworksQuery } from "./queries/impl/find-netoworks.query"
import { FindNetworkByIdQuery } from "./queries/impl/find-netowork-by-id.query"
import { RpcNodes } from "./schemas/rpcnode.schema"

@Injectable()
export class BlockchainService {
  constructor(private readonly httpService: HttpService, private readonly queryBus: QueryBus) { }

  async getGatewayFilters() {
    try {
      return await this.queryBus.execute<FindGatewayFiltersQuery, string[]>(new FindGatewayFiltersQuery())
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getNetworkFilters() {
    try {
      return await this.queryBus.execute<FindNetworkFiltersQuery, string[]>(new FindNetworkFiltersQuery())
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
      return await this.queryBus.execute<FindNetworkFiltersQuery, RpcNodes[]>(new FindNetworksQuery(searchQuery, selectedGatewayFilter, selectedNetworkFilter))
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewNetwork(networkId: string) {
    try {
      return await this.queryBus.execute<FindNetworkByIdQuery, RpcNodes>(new FindNetworkByIdQuery(networkId))
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async transactionGateway(requestBody: any, networkId: string) {
    try {
      const network = await this.queryBus.execute<FindNetworkByIdQuery, RpcNodes>(new FindNetworkByIdQuery(networkId))
      const { rpcProviderUri } = network
      const response = await lastValueFrom(this.httpService.post(rpcProviderUri, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
