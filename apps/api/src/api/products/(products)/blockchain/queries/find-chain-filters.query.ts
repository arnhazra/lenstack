import { BlockchainModel } from "../models/blockchain.model"

export async function findChainFilters() {
  const filterCategories = await BlockchainModel.find().distinct("rpcChain")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}