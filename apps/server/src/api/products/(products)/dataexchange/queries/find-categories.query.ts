import { MetaDataModel } from "../models/metadata.model"

export async function findDistinctCategories() {
  const filterCategories = await MetaDataModel.find().distinct("category")
  filterCategories.push("All")
  filterCategories.sort()
  return filterCategories
}