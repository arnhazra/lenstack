import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { EdgepayService } from "./edgepay.service"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("edgepay")
export class EdgepayController {
  constructor(private readonly edgepayService: EdgepayService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string) {
    try {
      await this.edgepayService.createTransaction(userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
