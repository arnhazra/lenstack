import { Controller, Post, Body, Get, Query } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { DataAPIDto } from "./dto/data-api.dto"
import { EventEmitter2 } from "@nestjs/event-emitter"

@Controller("products/datamarketplace")
export class DatamarketplaceController {
  constructor(private readonly datamarketplaceService: DatamarketplaceService, private readonly eventEmitter: EventEmitter2) { }

  @Get("filters")
  async getDatasetFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/datamarketplace", method: "GET", api: "/filters" })
      const filterCategories = await this.datamarketplaceService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/datamarketplace", method: "POST", api: "/finddatasets" })
      const datasets = await this.datamarketplaceService.findDatasets(findDatasetsDto)
      return { datasets }
    }

    catch (error) {
      throw error
    }
  }

  @Get("viewdataset")
  async viewDataset(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("datasetId") datasetId: string) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/datamarketplace", method: "GET", api: "/viewdataset" })
      const data = await this.datamarketplaceService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() dataapiDto: DataAPIDto) {
    try {
      this.eventEmitter.emit("createInsights", { userId: user.userId, module: "products/datamarketplace", method: "POST", api: "/dataapi" })
      const { datasetId } = dataapiDto
      const data = await this.datamarketplaceService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
