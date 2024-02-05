import { Injectable } from "@nestjs/common"
import { MetaDataModel } from "./entities/metadata.entity"
import { DatasetModel } from "./entities/dataset.entity"

@Injectable()
export class DatalakeRepository {
  async findDistinctCategories() {
    const filterCategories = await MetaDataModel.find().distinct("category")
    filterCategories.push("All")
    filterCategories.sort()
    return filterCategories
  }

  async findDatasets(searchQuery: string, selectedFilterCategory: string, selectedSortOption: string, offset: number, limit: number) {
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

  async findDatasetMetadataById(datasetId: string) {
    const metaData = await MetaDataModel.findById(datasetId)
    return metaData
  }

  async findDatasetDataById(datasetId: string) {
    const dataset = await DatasetModel.findOne({ datasetRelationId: datasetId })
    return dataset
  }
}
