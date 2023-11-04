import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import { otherConstants } from "src/constants/otherConstants"
import { HexscanRepository } from "./hexscan.repository"

@Injectable()
export class HexscanService {
  constructor(private readonly httpService: HttpService, private readonly hexscanRepository: HexscanRepository) { }

  async analyze(params: string, userId: string) {
    try {
      const response = await lastValueFrom(this.httpService.get(`${otherConstants.polygonScanApiEndpoint}/api?${params}`))
      await this.hexscanRepository.createNewTransaction(userId)
      return response.data
    }

    catch (error) {
      throw error
    }
  }
}
