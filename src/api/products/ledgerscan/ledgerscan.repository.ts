import { Injectable } from "@nestjs/common"
import { TransactionModel } from "./entities/transaction.entity"

@Injectable()
export class LedgerscanRepository {
  async createNewTransaction(workspaceId: string) {
    const transaction = await new TransactionModel({ workspaceId }).save()
    return transaction
  }
}
