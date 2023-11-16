import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { EdgepayService } from "./edgepay.service"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("products/edgepay")
export class EdgepayController {
  constructor(private readonly edgepayService: EdgepayService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse) {
    try {
      await this.edgepayService.createTransaction(ufak.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
