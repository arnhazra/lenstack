import { BadRequestException, Injectable } from "@nestjs/common"
import { PayRepository } from "./pay.repository"
import { lastValueFrom } from "rxjs"
import { HttpService } from "@nestjs/axios"
import { envConfig } from "src/config/env.config"

@Injectable()
export class PayService {
  constructor(private readonly payRepository: PayRepository, private readonly httpService: HttpService) { }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.payRepository.createTransaction(workspaceId)
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
