import { Controller, Post, Body, Get, Query, BadRequestException } from "@nestjs/common"
import { DatamarketplaceService } from "./datamarketplace.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/auth/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"
import { DataAPIDto } from "./dto/data-api.dto"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { EventsUnion } from "src/core/events/events.union"

@Controller("products/datamarketplace")
export class DatamarketplaceController {
  constructor(private readonly datamarketplaceService: DatamarketplaceService, private readonly eventEmitter: EventEmitter2) { }

  @Get("filters")
  async getDatasetFilters(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/datamarketplace", method: "GET", api: "/filters" })
      return await this.datamarketplaceService.getDatasetFilters()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() user: TokenAuthorizerResponse, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/datamarketplace", method: "POST", api: "/finddatasets" })
      return await this.datamarketplaceService.findDatasets(findDatasetsDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("viewdataset")
  async viewDataset(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("datasetId") datasetId: string) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/datamarketplace", method: "GET", api: "/viewdataset" })
      return await this.datamarketplaceService.viewDataset(datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("dataapi")
  async getData(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() dataapiDto: DataAPIDto) {
    try {
      this.eventEmitter.emit(EventsUnion.CreateInsights, { userId: user.userId, module: "products/datamarketplace", method: "POST", api: "/dataapi" })
      return await this.datamarketplaceService.getData(dataapiDto.datasetId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
