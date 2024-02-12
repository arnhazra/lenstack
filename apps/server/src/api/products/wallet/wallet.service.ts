import { BadRequestException, Injectable } from "@nestjs/common"
import { createTransactionCommand } from "./commands/create-tx.command"

@Injectable()
export class WalletService {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = await createTransactionCommand(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
