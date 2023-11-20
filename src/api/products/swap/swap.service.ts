import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { SwapRepository } from "./swap.repository"

@Injectable()
export class SwapService {
  constructor(private readonly swapRepository: SwapRepository) { }

  async getSwapTokenList(searchQuery: string) {
    try {
      const swapTokenConfig = await this.swapRepository.getTokens(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.swapRepository.createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
