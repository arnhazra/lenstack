import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapstreamTransactionModel } from "./entities/swapstream.entity"

@Injectable()
export class SwapstreamRepository {
  async createTransaction(owner: string, tokenContractAddress: string, amount: string, transactionType: string) {
    try {
      const transaction = new SwapstreamTransactionModel({ owner, tokenContractAddress, amount, transactionType })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
