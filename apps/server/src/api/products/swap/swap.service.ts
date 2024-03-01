import { BadRequestException, Injectable } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { getTokens } from "./queries/get-tokens.query"
import { createTransaction } from "./commands/create-tx.command"

@Injectable()
export class SwapService {
  async getSwapTokenList(searchQuery: string) {
    try {
      const swapTokenConfig = await getTokens(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
