import { Injectable } from "@nestjs/common"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { QueryBus } from "@nestjs/cqrs"
import { FindCatgoriesQuery } from "./queries/impl/find-categories.query"
import { FindDatasetsQuery } from "./queries/impl/find-datasets.query"
import { FindMetadataByIdQuery } from "./queries/impl/find-metadata.query"
import { FindDataByIdQuery } from "./queries/impl/find-data.query"
import { Metadata } from "./schemas/metadata.schema"
import { Dataset } from "./schemas/dataset.schema"
import { GenerationConfig, GoogleGenerativeAI, SchemaType } from "@google/generative-ai"
import { envConfig } from "src/env.config"
import { datasetSearchPrompt } from "src/shared/utils/prompts.config"

@Injectable()
export class DatamarketplaceService {
  constructor(private readonly queryBus: QueryBus) { }
  async getDatasetFilters() {
    try {
      return await this.queryBus.execute<FindCatgoriesQuery, string[]>(new FindCatgoriesQuery())
    }

    catch (error) {
      throw error
    }
  }

  async findDatasets(findDatasetsDto: FindDatasetsDto) {
    try {
      if (!findDatasetsDto.searchQuery) {
        return await this.queryBus.execute<FindDatasetsQuery, Metadata[]>(new FindDatasetsQuery(findDatasetsDto))
      }

      else {
        const queryObj: FindDatasetsDto = {
          limit: 100,
          offset: 0,
          searchQuery: "",
          selectedFilter: "",
          selectedSortOption: ""
        }

        const data = await this.queryBus.execute<FindDatasetsQuery, Metadata[]>(new FindDatasetsQuery(queryObj))

        try {
          const genAI = new GoogleGenerativeAI(envConfig.geminiAPIKey)
          const generationConfig: GenerationConfig = {
            temperature: 1,
            topP: 0.9,
            topK: 64,
            responseMimeType: "application/json",
          }
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig })
          const prompt = `${datasetSearchPrompt}. Datasets list - ${data}. User has given a search keyword ${findDatasetsDto.searchQuery}.`
          const result = await model.generateContent(prompt)
          const response: string[] = JSON.parse(result.response.text())
          const filteredDatasets = data.filter(dataset => response.includes(String(dataset._id)))
          return filteredDatasets
        }

        catch (error) {
          throw error
        }
      }
    }

    catch (error) {
      throw error
    }
  }

  async viewDataset(datasetId: string) {
    try {
      return await this.queryBus.execute<FindMetadataByIdQuery, { metaData: Metadata, dataLength: number }>(new FindMetadataByIdQuery(datasetId))
    }

    catch (error) {
      throw error
    }
  }

  async getData(datasetId: string) {
    try {
      return await this.queryBus.execute<FindDataByIdQuery, Dataset>(new FindDataByIdQuery(datasetId))
    }

    catch (error) {
      throw error
    }
  }
}
