import { BlockchainModel } from "../models/blockchain.model"

export async function findGatewayFilters() {
  const filterCategories = await BlockchainModel.find().distinct("rpcGateway")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}