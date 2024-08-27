import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Metadata } from "./schemas/metadata.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Dataset } from "./schemas/dataset.schema"
import { Model } from "mongoose"
import { FindDatasetsDto } from "./dto/find-datasets.dto"

@Injectable()
export class DatamarketplaceRepository {
  constructor(
    @InjectModel(Metadata.name, DbConnectionMap.DataMarketplace) private metadataModel: Model<Metadata>,
    @InjectModel(Dataset.name, DbConnectionMap.DataMarketplace) private datasetModel: Model<Dataset>
  ) { }

  async findUniqueCategories(): Promise<string[]> {
    const filters = await this.metadataModel.find().distinct("category")
    filters.push("All")
    filters.sort()
    return filters
  }

  async findDatasets(findDatasetsDto: FindDatasetsDto) {
    const searchQuery = findDatasetsDto.searchQuery || ""
    const selectedFilterCategory = findDatasetsDto.selectedFilter === "All" ? "" : findDatasetsDto.selectedFilter
    const selectedSortOption = findDatasetsDto.selectedSortOption || "name"
    const offset = findDatasetsDto.offset || 0
    const limit = 25
    return await this.metadataModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ],
      category: { $regex: selectedFilterCategory }
    }).sort(selectedSortOption)
      .skip(offset)
      .limit(limit)
  }

  async findMetaDataById(datasetId: string): Promise<{ metaData: Metadata, dataLength: number }> {
    const metaData = await this.metadataModel.findById(datasetId)
    const dataLength = (await this.datasetModel.findOne({ datasetRelationId: datasetId })).data.length
    return { metaData, dataLength }
  }

  async findDataById(datasetId: string): Promise<Dataset> {
    return await this.datasetModel.findOne({ datasetRelationId: datasetId })
  }
}
