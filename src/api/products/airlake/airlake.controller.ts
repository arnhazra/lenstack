import { Controller, Post, Body } from "@nestjs/common"
import { AirlakeService } from "./airlake.service"
import { FindDatasetsDto } from "./dto/find-datasets.dto"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ApiKeyAuthorizer, ApiKeyAuthorizerReturnType } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("products/airlake")
export class AirlakeController {
  constructor(private readonly airlakeService: AirlakeService) { }

  @Post("filters")
  async getDatasetFilters(@TokenAuthorizer() uft: TokenAuthorizerReturnType) {
    try {
      const filterCategories = await this.airlakeService.getDatasetFilters()
      return { filterCategories }
    }

    catch (error) {
      throw error
    }
  }

  @Post("finddatasets")
  async findDatasets(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body() findDatasetsDto: FindDatasetsDto) {
    try {
      const datasets = await this.airlakeService.findDatasets(findDatasetsDto)
      return { datasets }
    } catch (error) {
      throw error
    }
  }

  @Post("viewdataset")
  async viewDataset(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("datasetId") datasetId: string) {
    try {
      const data = await this.airlakeService.viewDataset(datasetId)
      return data
    }

    catch (error) {
      throw error
    }
  }

  @Post("findsimilardatasets")
  async findSimilarDatasets(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("datasetId") datasetId: string) {
    try {
      const similarDatasets = await this.airlakeService.findSimilarDatasets(datasetId)
      return { similarDatasets }
    }

    catch (error) {
      throw error
    }
  }

  @Post("dataapi")
  async getData(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Body("datasetId") datasetId: string) {
    try {
      const data = await this.airlakeService.getData(datasetId)
      return { data }
    }

    catch (error) {
      throw error
    }
  }
}
