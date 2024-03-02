import { HttpService } from "@nestjs/axios"
import { Injectable } from "@nestjs/common"
import { lastValueFrom } from "rxjs"
import { otherConstants } from "src/constants/other-constants"
import { createNewTransactionCommand } from "./commands/create-tx.command"

@Injectable()
export class LedgerscanService {
  constructor(private readonly httpService: HttpService) { }

  async analyze(params: string, workspaceId: string) {
    try {
      const response = await lastValueFrom(this.httpService.get(`${otherConstants.polygonScanApiEndpoint}/api?${params}`))
      await createNewTransactionCommand(workspaceId)
      return response.data
    }

    catch (error) {
      throw error
    }
  }
}
