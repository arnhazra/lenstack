import { Controller, Post, Body, Get, Query, BadRequestException, UseGuards, Request } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { DataAPIDto } from "./dto/data-api.dto"
import { ModRequest, TokenGuard } from "src/auth/token.guard"

@Controller("products/datamarketplace")
export class DatamarketplaceController {
  constructor(private readonly datamarketplaceService: DatamarketplaceService) { }

  @UseGuards(TokenGuard)
  @Get("filters")
  async getDatasetFilters() {
    try {
      return await this.datamarketplaceService.getDatasetFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Post("finddatasets")
  async findDatasets(@Body() findDatasetsDto: FindDatasetsDto) {
    try {
      return await this.datamarketplaceService.findDatasets(findDatasetsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @UseGuards(TokenGuard)
  @Get("viewdataset")
  async viewDataset(@Query("datasetId") datasetId: string) {
    try {
      return await this.datamarketplaceService.viewDataset(datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("dataapi")
  async getData(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() dataapiDto: DataAPIDto) {
    try {
      return await this.datamarketplaceService.getData(dataapiDto.datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
