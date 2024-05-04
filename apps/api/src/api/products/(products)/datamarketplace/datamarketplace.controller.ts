import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { DataAPIDto } from "./dto/data-api.dto"

@Controller("products/datamarketplace")
export class DatamarketplaceController {
  constructor(private readonly datamarketplaceService: DatamarketplaceService) { }

  @Get("filters")
  async getDatasetFilters(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      const filterCategories = await this.datamarketplaceService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      const datasets = await this.datamarketplaceService.findDatasets(findDatasetsDto)
      return { datasets }
    }

    catch (error) {
      throw error
    }
  }

  @Get("viewdataset")
  async viewDataset(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("datasetId") datasetId: string) {
    try {
      const data = await this.datamarketplaceService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() dataapiDto: DataAPIDto) {
    try {
      const { datasetId } = dataapiDto
      const data = await this.datamarketplaceService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
