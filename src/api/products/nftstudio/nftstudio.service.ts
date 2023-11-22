import { BadRequestException, Injectable } from "@nestjs/common"
import { NftstudioRepository } from "./nftstudio.repository"
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/config/env.config"
import { statusMessages } from "src/constants/status-messages"

@Injectable()
export class NftstudioService {
  constructor(private readonly nftstudioRepository: NftstudioRepository, private readonly httpService: HttpService) { }

  async createTransaction(workspaceId: string) {
    try {
      await this.nftstudioRepository.createTransaction(workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async signTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.quicknodeGateway, requestBody))
      return response.data
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
}
