import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapstreamTransactionModel } from "./entities/swapstream-tx.entity"
import { SwapstreamTokenMetadataModel } from "./entities/swapstream-tokens.entity"

@Injectable()
export class SwapstreamRepository {
  async getTokens(searchQuery: string) {
    try {
      const tokens = await SwapstreamTokenMetadataModel.find({
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
      const transaction = new SwapstreamTransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
