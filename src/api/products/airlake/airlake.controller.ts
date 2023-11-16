import { Controller, Post, Body } from "@nestjs/common"
import { AirlakeService } from "./airlake.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { SearchDatasetDto } from "./dto/search-dataset.dto"

@Controller("products/airlake")
export class AirlakeController {
  constructor(private readonly airlakeService: AirlakeService) { }

  @Post("filters")
  async getDatasetFilters(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const filterCategories = await this.airlakeService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      const datasets = await this.airlakeService.findDatasets(findDatasetsDto)
      return { datasets }
    } catch (error) {
      throw error
    }
  }

  @Post("viewdataset")
  async viewDataset(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchDatasetDto: SearchDatasetDto) {
    try {
      const { datasetId } = searchDatasetDto
      const data = await this.airlakeService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("findsimilardatasets")
  async findSimilarDatasets(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchDatasetDto: SearchDatasetDto) {
    try {
      const { datasetId } = searchDatasetDto
      const similarDatasets = await this.airlakeService.findSimilarDatasets(datasetId)
      return { similarDatasets }
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Body() searchDatasetDto: SearchDatasetDto) {
    try {
      const { datasetId } = searchDatasetDto
      const data = await this.airlakeService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
