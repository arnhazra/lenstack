import { Injectable } from "@nestjs/common"
import { FindNetworksDto } from "./dto/find-networks.dto"
import { InjectModel } from "@nestjs/mongoose"
import { RpcNodes } from "./schemas/blockchain.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"

@Injectable()
export class BlockchainRepository {
  constructor(@InjectModel(RpcNodes.name, DbConnectionMap.Blockchain) private model: Model<RpcNodes>) { }

  async findGatewayFilters() {
    const filters = await this.model.find().distinct("rpcGateway")
    filters.push("All")
    filters.sort()
    return filters
  }

  async findNetworkFilters() {
    const filters = await this.model.find().distinct("rpcNetwork")
    filters.push("All")
    filters.sort()
    return filters
  }

  async findNetworks(findNetworksDto: FindNetworksDto) {
    const searchQuery = findNetworksDto.searchQuery || ""
    const selectedGatewayFilter = findNetworksDto.selectedGatewayFilter === "All" ? "" : findNetworksDto.selectedGatewayFilter
    const selectedNetworkFilter = findNetworksDto.selectedNetworkFilter === "All" ? "" : findNetworksDto.selectedNetworkFilter
    let networks = await this.model.find({
      $or: [
        { rpcProviderName: { $regex: searchQuery, $options: "i" } }
      ],
      rpcGateway: { $regex: selectedGatewayFilter },
      rpcNetwork: { $regex: selectedNetworkFilter },
    })

    return networks
  }

  async findNetworkById(networkId: string) {
    const network = await this.model.findById(networkId)
    return network
  }
}
