import { BadRequestException, Injectable } from "@nestjs/common"
import { envConfig } from "src/env.config"
import { statusMessages } from "src/constants/status-messages"
import { createTransaction } from "./commands/create-tx.command"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"

@Injectable()
export class NftstudioService {
  constructor(private readonly httpService: HttpService) { }

  async createTransaction(workspaceId: string) {
    try {
      await createTransaction(workspaceId)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  getNftContractAddress() {
    try {
      const { nftContractAddress } = envConfig
      return { nftContractAddress }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
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
