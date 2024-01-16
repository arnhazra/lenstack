import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { TransactionService } from "./transaction.service"

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post("gateway/alchemy")
  async alchemyTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.alchemyTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/infura")
  async infuraTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.infuraTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/quicknode")
  async quicknodeTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.quicknodeTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
