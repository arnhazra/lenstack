import { BlockchainModel } from "../models/blockchain.model"

export async function findNetworksQuery(searchQuery: string, selectedChainFilter: string, selectedGatewayFilter: string, selectedNetworkFilter: string) {
  let networks = await BlockchainModel.find({
    $or: [
      { rpcProviderName: { $regex: searchQuery, $options: "i" } }
    ],
    rpcChain: { $regex: selectedChainFilter },
    rpcGateway: { $regex: selectedGatewayFilter },
    rpcNetwork: { $regex: selectedNetworkFilter },
  })

  return networks
}