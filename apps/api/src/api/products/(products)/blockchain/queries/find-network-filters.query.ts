import { BlockchainModel } from "../models/blockchain.model"

export async function findNetworkFilters() {
  const filterCategories = await BlockchainModel.find().distinct("rpcNetwork")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}