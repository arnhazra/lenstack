import { Controller, Post, Body, Delete, Get, Patch, Param } from "@nestjs/common"
import { HttpNosqlService } from "./httpnosql.service"
import { CreateDataDto } from "./dto/create-data.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/auth/credential-authorizer.decorator"

@Controller("products/httpnosql")
export class HttpNosqlController {
  constructor(private readonly httpNosqlService: HttpNosqlService) { }

  @Post("create")
  async createKeyValue(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() createDataDto: CreateDataDto) {
    try {
      return await this.httpNosqlService.createKeyValue(user.orgId, createDataDto)
    }

    catch (error) {
      throw error
    }
  }

  @Get("read")
  async readAllValues(@CredentialAuthorizer() user: CredentialAuthorizerResponse) {
    try {
      return await this.httpNosqlService.readAllValues(user.orgId)
    }

    catch (error) {
      throw error
    }
  }

  @Get("read/:key")
  async readValueByKey(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Param() params: any) {
    try {
      return await this.httpNosqlService.readValueByKey(user.orgId, params.key)
    }

    catch (error) {
      throw error
    }
  }

  @Patch("update")
  async updateValueByKey(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() updateDataDto: CreateDataDto) {
    try {
      return await this.httpNosqlService.updateValueByKey(user.orgId, updateDataDto)
    }

    catch (error) {
      throw error
    }
  }

  @Delete("delete/:key")
  async deleteValueByKey(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Param() params: any) {
    try {
      return await this.httpNosqlService.deleteValueByKey(user.orgId, params.key)
    }

    catch (error) {
      throw error
    }
  }
}
