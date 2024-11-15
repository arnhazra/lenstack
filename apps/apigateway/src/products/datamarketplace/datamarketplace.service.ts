import { Injectable } from "@nestjs/common"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { QueryBus } from "@nestjs/cqrs"
import { FindCatgoriesQuery } from "./queries/impl/find-categories.query"
import { FindDatasetsQuery } from "./queries/impl/find-datasets.query"
import { FindMetadataByIdQuery } from "./queries/impl/find-metadata.query"
import { FindDataByIdQuery } from "./queries/impl/find-data.query"
import { Metadata } from "./schemas/metadata.schema"
import { Dataset } from "./schemas/dataset.schema"

@Injectable()
export class DatamarketplaceService {
  constructor(private readonly queryBus: QueryBus) {}
  async getDatasetFilters() {
    try {
      return await this.queryBus.execute<FindCatgoriesQuery, string[]>(
        new FindCatgoriesQuery()
      )
    } catch (error) {
      throw error
    }
  }

  async findDatasets(findDatasetsDto: FindDatasetsDto) {
    try {
      return await this.queryBus.execute<FindDatasetsQuery, Metadata[]>(
        new FindDatasetsQuery(findDatasetsDto)
      )
    } catch (error) {
      throw error
    }
  }

  async viewDataset(datasetId: string) {
    try {
      return await this.queryBus.execute<
        FindMetadataByIdQuery,
        { metaData: Metadata; dataLength: number }
      >(new FindMetadataByIdQuery(datasetId))
    } catch (error) {
      throw error
    }
  }

  async getData(datasetId: string) {
    try {
      return await this.queryBus.execute<FindDataByIdQuery, Dataset>(
        new FindDataByIdQuery(datasetId)
      )
    } catch (error) {
      throw error
    }
  }
}
