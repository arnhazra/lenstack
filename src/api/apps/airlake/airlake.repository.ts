import { Injectable } from "@nestjs/common"
import { MasterAirlakeDatasetMetaDataModel } from "./entities/airlake-metadata.entity"
import { MasterAirlakeDatasetDataModel } from "./entities/airlake-dataset.entity"
import { MasterAirlakeHistoryModel, ReplicaAirlakeHistoryModel } from "./entities/airlake-history.entity"

@Injectable()
export class AirlakeRepository {
  async findDistinctCategories() {
    const filterCategories = await MasterAirlakeDatasetMetaDataModel.find().distinct("category")
    filterCategories.push("All")
    filterCategories.sort()
    return filterCategories
  }

  async findDatasets(searchQuery: string, selectedFilterCategory: string, selectedSortOption: string, offset: number, limit: number) {
    let datasets = await MasterAirlakeDatasetMetaDataModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ],
      category: { $regex: selectedFilterCategory }
    }).select("-description")
      .sort(selectedSortOption)
      .skip(offset)
      .limit(limit)

    return datasets
  }

  async findDatasetMetadataById(datasetId: string) {
    const metaData = await MasterAirlakeDatasetMetaDataModel.findById(datasetId)
    return metaData
  }

  async findDatasetDataById(datasetId: string) {
    const dataset = await MasterAirlakeDatasetDataModel.findOne({ datasetRelationId: datasetId })
    return dataset
  }

  async createNewHistory(owner: string, datasetId: string, apiKey: string) {
    const airlakeHistoryReq = new MasterAirlakeHistoryModel({ owner, datasetId, apiKey })
    await airlakeHistoryReq.save()
    const replicaAirlakeHistoryReq = new ReplicaAirlakeHistoryModel({ _id: airlakeHistoryReq.id, owner, datasetId, apiKey })
    await replicaAirlakeHistoryReq.save()
  }

  async findCountByApiKey(apiKey: string) {
    const airlakeUsedTokens = await MasterAirlakeHistoryModel.find({ apiKey }).countDocuments()
    return airlakeUsedTokens
  }
}
