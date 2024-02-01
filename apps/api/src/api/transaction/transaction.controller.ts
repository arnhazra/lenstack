import { Controller, Post, Body, BadRequestException } from "@nestjs/common"
import { TransactionService } from "./transaction.service"

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post("alchemy-gateway")
  async alchemyTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.alchemyTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getblock-gateway")
  async getblockTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.getblockTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("infura-gateway")
  async infuraTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.transactionService.infuraTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("quicknode-gateway")
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
