import { BlockchainModel } from "../models/blockchain.model"

export async function findNetworkDetailsById(networkId: string) {
  const data = await BlockchainModel.findById(networkId)
  return data
}