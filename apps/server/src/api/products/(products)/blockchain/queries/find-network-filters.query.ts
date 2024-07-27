import { BlockchainModel } from "../schemas/blockchain.schema"

export async function findNetworkFilters() {
  const filterCategories = await BlockchainModel.find().distinct("rpcNetwork")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}