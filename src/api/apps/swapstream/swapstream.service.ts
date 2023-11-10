import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/constants/statusMessages"
import { SwapstreamRepository } from "./swapstream.repository"

@Injectable()
export class SwapstreamService {
  constructor(private readonly swapstreamRepository: SwapstreamRepository) { }

  async getSwapStreamTokenList() {
    try {
      const swapstreamTokenConfig = await this.swapstreamRepository.getTokens()
      return swapstreamTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      await this.swapstreamRepository.createTransaction(workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
