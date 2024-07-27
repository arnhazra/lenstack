import { BlockchainModel } from "../schemas/blockchain.schema"

export async function findNetworkDetailsById(networkId: string) {
  const data = await BlockchainModel.findById(networkId)
  return data
}