import { HttpService } from "@nestjs/axios"
import { BadRequestException, Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import { envConfig } from "../../env.config"

@Injectable()
export class TransactionService {
  constructor(private readonly httpService: HttpService) { }

  async alchemyTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async infuraTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async quicknodeTransactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.quicknodeGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
