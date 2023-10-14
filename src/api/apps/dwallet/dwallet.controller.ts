import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { DwalletService } from "./dwallet.service"
import { CreateTransactionDto } from "./dto/dwallet-tx"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("dwallet")
export class DwalletController {
  constructor(private readonly dwalletService: DwalletService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      await this.dwalletService.createTransaction(createTransactionDto, userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
