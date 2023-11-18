import { BadRequestException, Injectable } from "@nestjs/common"
import { DatalakeRepository } from "./datalake.repository"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { SubscriptionRepository } from "src/api/subscription/subscription.repository"

@Injectable()
export class DatalakeService {
  constructor(private readonly datalakeRepository: DatalakeRepository,
    private readonly subscriptionRepository: SubscriptionRepository) { }

  async getDatasetFilters() {
    try {
      const filterCategories = await this.datalakeRepository.findDistinctCategories()
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
      const datasets = await this.datalakeRepository.findDatasets(searchQuery, selectedFilterCategory, selectedSortOption, offset, limit)
      return datasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDataset(datasetId: string) {
    try {
      const dataset = await this.datalakeRepository.findDatasetMetadataById(datasetId)
      return dataset
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findSimilarDatasets(datasetId: string) {
    try {
      const dataset = await this.datalakeRepository.findDatasetMetadataById(datasetId)
      const datasetCategory = dataset.category
      const similarDatasets = await this.datalakeRepository.findDatasets("", datasetCategory, "name", 0, 36)
      return similarDatasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getData(datasetId: string) {
    try {
      const data = await this.datalakeRepository.findDatasetDataById(datasetId)
      return data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
