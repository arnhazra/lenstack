import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import { otherConstants } from "src/constants/other-constants"
import { LedgerscanRepository } from "./ledgerscan.repository"

@Injectable()
export class LedgerscanService {
  constructor(private readonly httpService: HttpService, private readonly ledgerscanRepository: LedgerscanRepository) { }

  async analyze(params: string, workspaceId: string) {
    try {
      const response = await lastValueFrom(this.httpService.get(`${otherConstants.polygonScanApiEndpoint}/api?${params}`))
      await this.ledgerscanRepository.createNewTransaction(workspaceId)
      return response.data
    }

    catch (error) {
      throw error
    }
  }
}
