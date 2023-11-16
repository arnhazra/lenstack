import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { CreateApiReferenceDto } from "./dto/create-apireference.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { SearchApiReferenceDto } from "./dto/search-apireference.dto"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) { }

  @Post("create")
  async createApiReference(@Body() createApiReferenceDto: CreateApiReferenceDto) {
    try {
      await this.apireferenceService.createApiReference(createApiReferenceDto)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }

  }

  @Post("getallbyproductname")
  async getApiReferenceByProductName(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchApiReferenceDto: SearchApiReferenceDto) {
    try {
      const { productName } = searchApiReferenceDto
      const docList = await this.apireferenceService.getApiReferenceByProductName(productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
