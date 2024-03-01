import { BadRequestException, Injectable } from "@nestjs/common"
import { createTransactionCommand } from "./commands/create-tx.command"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/env.config"

@Injectable()
export class WalletService {
  constructor(private readonly httpService: HttpService) { }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await createTransactionCommand(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async transactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
