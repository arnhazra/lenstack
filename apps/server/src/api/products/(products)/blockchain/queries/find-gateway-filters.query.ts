import { BlockchainModel } from "../schemas/blockchain.schema"

export async function findGatewayFilters() {
  const filterCategories = await BlockchainModel.find().distinct("rpcGateway")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}