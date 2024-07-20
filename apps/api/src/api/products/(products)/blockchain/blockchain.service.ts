import { BadRequestException, Injectable } from '@nestjs/common'
import { HttpService } from "@nestjs/axios"
import { lastValueFrom } from "rxjs"
import { envConfig } from "src/env.config"

@Injectable()
export class BlockchainService {
  constructor(private readonly httpService: HttpService) { }

  async transactionGateway(requestBody: any, workspaceId: string) {
    try {
      const response = await lastValueFrom(this.httpService.post(envConfig.alchemyGateway, requestBody))
      return response.data
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
