import { Controller, Post, Body } from "@nestjs/common"
import { DatalakeService } from "./datalake.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikey-authorizer.decorator"
import { SearchDatasetDto } from "./dto/search-dataset.dto"

@Controller("products/datalake")
export class DatalakeController {
  constructor(private readonly datalakeService: DatalakeService) { }

  @Post("filters")
  async getDatasetFilters(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const filterCategories = await this.datalakeService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      const datasets = await this.datalakeService.findDatasets(findDatasetsDto)
      return { datasets }
    } catch (error) {
      throw error
    }
  }

  @Post("viewdataset")
  async viewDataset(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchDatasetDto: SearchDatasetDto) {
    try {
      const { datasetId } = searchDatasetDto
      const data = await this.datalakeService.viewDataset(datasetId)
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
      const similarDatasets = await this.datalakeService.findSimilarDatasets(datasetId)
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
      const data = await this.datalakeService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
