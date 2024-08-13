import { Controller, BadRequestException, Get, UseGuards, Param, UseInterceptors } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenGuard } from "src/auth/token.guard"
import { TokenInterceptor } from "src/auth/token.interceptor"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) { }

  @UseGuards(TokenGuard)
  @UseInterceptors(TokenInterceptor)
  @Get("/:productName")
  async getApiReferenceByProductName(@Param() params: any) {
    try {
      return await this.apireferenceService.getApiReferenceByProductName(params.productName)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
