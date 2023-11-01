import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { EdgepayService } from "./edgepay.service"
import { CreateTransactionDto } from "./dto/edgepay-tx"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("edgepay")
export class EdgepayController {
  constructor(private readonly edgepayService: EdgepayService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      await this.edgepayService.createTransaction(createTransactionDto, userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
