import { BlockchainModel } from "../models/blockchain.model"

export async function findNetworksQuery(searchQuery: string, selectedGatewayFilter: string, selectedNetworkFilter: string) {
  let networks = await BlockchainModel.find({
    $or: [
      { rpcProviderName: { $regex: searchQuery, $options: "i" } }
    ],
    rpcGateway: { $regex: selectedGatewayFilter },
    rpcNetwork: { $regex: selectedNetworkFilter },
  })

  return networks
}