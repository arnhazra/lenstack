import { Controller, BadRequestException, Get, UseGuards, Param } from "@nestjs/common"
import { ApiReferenceService } from "./apireference.service"
import { TokenGuard } from "src/auth/token.guard"

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) { }

  @UseGuards(TokenGuard)
  @Get("/:productName")
  async getApiReferenceByProductName(@Param() params: any) {
    try {
      const docList = await this.apireferenceService.getApiReferenceByProductName(params.productName)
      return { docList }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
