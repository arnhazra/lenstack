import { BadRequestException, Injectable } from "@nestjs/common"
import { WalletRepository } from "./wallet.repository"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"
import { envConfig } from "src/config/env.config"

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository, private readonly httpService: HttpService) { }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.walletRepository.createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async signTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
