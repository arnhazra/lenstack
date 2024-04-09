import { Controller, Post, Body, BadRequestException, Get, Query } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { CreateApiReferenceDto } from "./dto/create-apireference.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) { }

  @Post("create")
  async createApiReference(@Body() createApiReferenceDto: CreateApiReferenceDto) {
    try {
      return await this.apireferenceService.createApiReference(createApiReferenceDto)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("get")
  async getApiReferenceByProductName(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("productName") productName: string) {
    try {
      const docList = await this.apireferenceService.getApiReferenceByProductName(productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
