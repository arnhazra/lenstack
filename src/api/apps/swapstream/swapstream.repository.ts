import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapstreamTransactionModel } from "./entities/swapstream.entity"

@Injectable()
export class SwapstreamRepository {
  async createTransaction(owner: string, tokenContractAddress: string, amount: string, transactionType: string, apiKey: string,) {
    try {
      const transaction = new SwapstreamTransactionModel({ owner, tokenContractAddress, amount, transactionType, apiKey })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findCountByApiKey(apiKey: string) {
    const airlakeUsedTokens = await SwapstreamTransactionModel.find({ apiKey }).countDocuments()
    return airlakeUsedTokens
  }
}
