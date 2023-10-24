import { BadRequestException, Injectable } from "@nestjs/common"
import { AirlakeRepository } from "./airlake.repository"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { SubscriptionRepository } from "src/api/subscription/subscription.repository"

@Injectable()
export class AirlakeService {
  constructor(private readonly airlakeRepository: AirlakeRepository,
    private readonly subscriptionRepository: SubscriptionRepository) { }

  async getDatasetFilters() {
    try {
      const filterCategories = await this.airlakeRepository.findDistinctCategories()
      return filterCategories
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findDatasets(findDatasetsDto: FindDatasetsDto) {
    try {
      const searchQuery = findDatasetsDto.searchQuery || ""
      const selectedFilterCategory = findDatasetsDto.selectedFilter === "All" ? "" : findDatasetsDto.selectedFilter
      const selectedSortOption = findDatasetsDto.selectedSortOption || "name"
      const offset = findDatasetsDto.offset || 0
      const limit = 36
      const datasets = await this.airlakeRepository.findDatasets(searchQuery, selectedFilterCategory, selectedSortOption, offset, limit)
      return datasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDataset(datasetId: string) {
    try {
      const dataset = await this.airlakeRepository.findDatasetMetadataById(datasetId)
      return dataset
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findSimilarDatasets(datasetId: string) {
    try {
      const dataset = await this.airlakeRepository.findDatasetMetadataById(datasetId)
      const datasetCategory = dataset.category
      const similarDatasets = await this.airlakeRepository.findDatasets("", datasetCategory, "name", 0, 36)
      return similarDatasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getData(userId: string, datasetId: string, apiKey: string) {
    try {
      const data = await this.airlakeRepository.findDatasetDataById(datasetId)
      await this.airlakeRepository.createNewHistory(userId, datasetId, apiKey)
      return data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
