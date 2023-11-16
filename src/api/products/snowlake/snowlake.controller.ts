import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { SnowlakeService } from "./snowlake.service"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("products/snowlake")
export class SnowlakeController {
  constructor(private readonly snowlakeService: SnowlakeService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse) {
    try {
      await this.snowlakeService.createTransaction(ufak.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
