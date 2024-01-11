import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { TransactionService } from "./transaction.service"

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post("gateway")
  async transactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.transactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
