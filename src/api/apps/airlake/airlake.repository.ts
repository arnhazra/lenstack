import { Injectable } from "@nestjs/common"
import { AirlakeDatasetMetaDataModel } from "./entities/airlake-metadata.entity"
import { AirlakeDatasetDataModel } from "./entities/airlake-dataset.entity"

@Injectable()
export class AirlakeRepository {
  async findDistinctCategories() {
    const filterCategories = await AirlakeDatasetMetaDataModel.find().distinct("category")
    filterCategories.push("All")
    filterCategories.sort()
    return filterCategories
  }

  async findDatasets(searchQuery: string, selectedFilterCategory: string, selectedSortOption: string, offset: number, limit: number) {
    let datasets = await AirlakeDatasetMetaDataModel.find({
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
    const metaData = await AirlakeDatasetMetaDataModel.findById(datasetId)
    return metaData
  }

  async findDatasetDataById(datasetId: string) {
    const dataset = await AirlakeDatasetDataModel.findOne({ datasetRelationId: datasetId })
    return dataset
  }
}
