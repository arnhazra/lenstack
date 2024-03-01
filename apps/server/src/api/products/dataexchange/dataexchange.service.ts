import { BadRequestException, Injectable } from "@nestjs/common"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { findDistinctCategories } from "./queries/find-categories.query"
import { findDatasetDataById } from "./queries/find-data.query"
import { findDatasets } from "./queries/find-datasets.query"
import { findDatasetMetadataById } from "./queries/find-metadata.query"

@Injectable()
export class DataexchangeService {
  async getDatasetFilters() {
    try {
      const filterCategories = await findDistinctCategories()
      return filterCategories
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findDatasets(findDatasetsDto: FindDatasetsDto) {
    try {
      const searchQuery = findDatasetsDto.searchQuery || ""
      const selectedFilterCategory = findDatasetsDto.selectedFilter === "All" ? "" : findDatasetsDto.selectedFilter
      const selectedSortOption = findDatasetsDto.selectedSortOption || "name"
      const offset = findDatasetsDto.offset || 0
      const limit = 24
      const datasets = await findDatasets(searchQuery, selectedFilterCategory, selectedSortOption, offset, limit)
      return datasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async viewDataset(datasetId: string) {
    try {
      const dataset = await findDatasetMetadataById(datasetId)
      return dataset
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findSimilarDatasets(datasetId: string) {
    try {
      const dataset = await findDatasetMetadataById(datasetId)
      const datasetCategory = dataset.category
      const similarDatasets = await findDatasets("", datasetCategory, "name", 0, 24)
      return similarDatasets
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getData(datasetId: string) {
    try {
      const data = await findDatasetDataById(datasetId)
      return data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
