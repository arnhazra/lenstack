import { BadRequestException, Injectable } from "@nestjs/common"
import { TransactionModel } from "./entities/transaction.entity"
import { TokenModel } from "./entities/token.entity"

@Injectable()
export class SwapRepository {
  async getTokens(searchQuery: string) {
    try {
      const tokens = await TokenModel.find({
        $or: [
          { tokenName: { $regex: searchQuery, $options: "i" } },
          { tokenSymbol: { $regex: searchQuery, $options: "i" } },
        ]
      })
      return tokens
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = new TransactionModel({ workspaceId })
      await transaction.save()
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
