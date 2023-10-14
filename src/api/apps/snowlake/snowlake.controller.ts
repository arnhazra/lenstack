import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { SnowlakeService } from "./snowlake.service"
import { CreateTransactionDto } from "./dto/snowlake-tx.dto"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("snowlake")
export class SnowlakeController {
  constructor(private readonly snowlakeService: SnowlakeService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string, @Body() createTransactionDto: CreateTransactionDto) {
    try {
      await this.snowlakeService.createTransaction(createTransactionDto, userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
