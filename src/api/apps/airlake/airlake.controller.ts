import { Controller, Post, Body } from "@nestjs/common"
import { AirlakeService } from "./airlake.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("airlake")
export class AirlakeController {
  constructor(private readonly airlakeService: AirlakeService) { }

  @Post("filters")
  async getDatasetFilters(@TokenAuthorizer() userId: string) {
    try {
      const filterCategories = await this.airlakeService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() userId: string, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      const datasets = await this.airlakeService.findDatasets(findDatasetsDto)
      return { datasets }
    } catch (error) {
      throw error
    }
  }

  @Post("viewdataset")
  async viewDataset(@TokenAuthorizer() userId: string, @Body("datasetId") datasetId: string) {
    try {
      const data = await this.airlakeService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("findsimilardatasets")
  async findSimilarDatasets(@TokenAuthorizer() userId: string, @Body("datasetId") datasetId: string) {
    try {
      const similarDatasets = await this.airlakeService.findSimilarDatasets(datasetId)
      return { similarDatasets }
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@ApiKeyAuthorizer() userId: string, @Body("datasetId") datasetId: string, @Body("apiKey") apiKey: string) {
    try {
      const data = await this.airlakeService.getData(userId, datasetId, apiKey)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
