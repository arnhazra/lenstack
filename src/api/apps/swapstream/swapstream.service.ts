import { BadRequestException, Injectable } from "@nestjs/common"
import { swapstreamTokenConfig } from "src/config/swapstreamTokenConfig"
import { statusMessages } from "src/constants/statusMessages"
import { SwapstreamTransactionDto } from "./dto/swapstream-tx.dto"
import { SwapstreamRepository } from "./swapstream.repository"

@Injectable()
export class SwapstreamService {
  constructor(private readonly swapstreamRepository: SwapstreamRepository) { }

  getSwapStreamTokenList() {
    try {
      return swapstreamTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(swapstreamTransactionDto: SwapstreamTransactionDto, userId: string) {
    try {
      const { amount, tokenContractAddress, transactionType } = swapstreamTransactionDto
      await this.swapstreamRepository.createTransaction(userId, tokenContractAddress, amount, transactionType)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
