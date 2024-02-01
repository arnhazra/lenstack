import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import { DatalakeService } from "./datalake.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { DataAPIDto } from "./dto/data-api.dto"

@Controller("products/datalake")
export class DatalakeController {
  constructor(private readonly datalakeService: DatalakeService) { }

  @Get("filters")
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
    }

    catch (error) {
      throw error
    }
  }

  @Get("viewdataset")
  async viewDataset(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("datasetId") datasetId: string) {
    try {
      const data = await this.datalakeService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Get("findsimilardatasets")
  async findSimilarDatasets(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("datasetId") datasetId: string) {
    try {
      const similarDatasets = await this.datalakeService.findSimilarDatasets(datasetId)
      return { similarDatasets }
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() dataapiDto: DataAPIDto) {
    try {
      const { datasetId } = dataapiDto
      const data = await this.datalakeService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
