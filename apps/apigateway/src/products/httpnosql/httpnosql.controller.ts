import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Patch,
  Param,
  Request,
  UseGuards,
} from "@nestjs/common"
import { HttpNosqlService } from "./httpnosql.service"
import { CreateDataDto } from "./dto/create-data.dto"
import { ModRequest } from "src/shared/auth/types/mod-request.interface"
import { CredentialGuard } from "src/shared/auth/credential.guard"

@Controller("products/httpnosql")
export class HttpNosqlController {
  constructor(private readonly httpNosqlService: HttpNosqlService) {}

  @UseGuards(CredentialGuard)
  @Post("create")
  async createKeyValue(
    @Request() request: ModRequest,
    @Body() createDataDto: CreateDataDto
  ) {
    try {
      return await this.httpNosqlService.createKeyValue(
        request.user.orgId,
        createDataDto
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Get("read")
  async readAllValues(@Request() request: ModRequest) {
    try {
      return await this.httpNosqlService.readAllValues(request.user.orgId)
    } catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Get("read/:key")
  async readValueByKey(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.httpNosqlService.readValueByKey(
        request.user.orgId,
        params.key
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Patch("update")
  async updateValueByKey(
    @Request() request: ModRequest,
    @Body() updateDataDto: CreateDataDto
  ) {
    try {
      return await this.httpNosqlService.updateValueByKey(
        request.user.orgId,
        updateDataDto
      )
    } catch (error) {
      throw error
    }
  }

  @UseGuards(CredentialGuard)
  @Delete("delete/:key")
  async deleteValueByKey(@Request() request: ModRequest, @Param() params: any) {
    try {
      return await this.httpNosqlService.deleteValueByKey(
        request.user.orgId,
        params.key
      )
    } catch (error) {
      throw error
    }
  }
}
