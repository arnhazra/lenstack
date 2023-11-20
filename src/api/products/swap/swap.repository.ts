import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapTransactionModel } from "./entities/swap-tx.entity"
import { SwapTokenMetadataModel } from "./entities/swap-tokens.entity"

@Injectable()
export class SwapRepository {
  async getTokens(searchQuery: string) {
    try {
      const tokens = await SwapTokenMetadataModel.find({
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
      const transaction = new SwapTransactionModel({ workspaceId })
      await transaction.save()
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
