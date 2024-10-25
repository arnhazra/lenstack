import {
  Controller,
  BadRequestException,
  Get,
  UseGuards,
  Param,
} from "@nestjs/common";
import { ApiReferenceService } from "./apireference.service";
import { TokenGuard } from "src/shared/auth/token.guard";

@Controller("apireference")
export class ApiReferenceController {
  constructor(private readonly apireferenceService: ApiReferenceService) {}

  @UseGuards(TokenGuard)
  @Get("/:productName")
  async getApiReferenceByProductName(@Param() params: any) {
    try {
      return await this.apireferenceService.getApiReferenceByProductName(
        params.productName
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
