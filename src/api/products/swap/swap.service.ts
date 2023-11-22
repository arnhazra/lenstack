import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { SwapRepository } from "./swap.repository"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/config/env.config"
import { HttpService } from "@nestjs/axios"

@Injectable()
export class SwapService {
  constructor(private readonly swapRepository: SwapRepository, private readonly httpService: HttpService) { }

  async getSwapTokenList(searchQuery: string) {
    try {
      const swapTokenConfig = await this.swapRepository.getTokens(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.swapRepository.createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async signTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
