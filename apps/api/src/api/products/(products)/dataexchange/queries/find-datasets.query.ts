import { MetaDataModel } from "../models/metadata.model"

export async function findDatasetsQuery(searchQuery: string, selectedFilterCategory: string, selectedSortOption: string, offset: number, limit: number) {
  let datasets = await MetaDataModel.find({
    $or: [
      { name: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } }
    ],
    category: { $regex: selectedFilterCategory }
  }).sort(selectedSortOption)
    .skip(offset)
    .limit(limit)

  return datasets
}