import { HttpService } from "@nestjs/axios"
import { BadRequestException, Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/env.config"

@Injectable()
export class TransactionService {
  constructor(private readonly httpService: HttpService) { }

  async transactionGateway(requestBody: any) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.infuraGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
