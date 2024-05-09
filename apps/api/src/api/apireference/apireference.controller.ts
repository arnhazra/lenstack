import { Controller, BadRequestException, Get, Query } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) { }

  @Get("get")
  async getApiReferenceByProductName(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("productName") productName: string) {
    try {
      const docList = await this.apireferenceService.getApiReferenceByProductName(productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
