import { Injectable } from "@nestjs/common"
import { DatalakeDatasetMetaDataModel } from "./entities/datalake-metadata.entity"
import { DatalakeDatasetDataModel } from "./entities/datalake-dataset.entity"

@Injectable()
export class DatalakeRepository {
  async findDistinctCategories() {
    const filterCategories = await DatalakeDatasetMetaDataModel.find().distinct("category")
    filterCategories.push("All")
    filterCategories.sort()
    return filterCategories
  }

  async findDatasets(searchQuery: string, selectedFilterCategory: string, selectedSortOption: string, offset: number, limit: number) {
    let datasets = await DatalakeDatasetMetaDataModel.find({
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
    const metaData = await DatalakeDatasetMetaDataModel.findById(datasetId)
    return metaData
  }

  async findDatasetDataById(datasetId: string) {
    const dataset = await DatalakeDatasetDataModel.findOne({ datasetRelationId: datasetId })
    return dataset
  }
}
