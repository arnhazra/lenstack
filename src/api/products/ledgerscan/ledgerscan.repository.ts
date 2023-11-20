import { Injectable } from "@nestjs/common"
import { LedgerscanTransactionModel } from "./entities/ledgerscan.entity"

@Injectable()
export class LedgerscanRepository {
  async createNewTransaction(workspaceId: string) {
    const transaction = await new LedgerscanTransactionModel({ workspaceId }).save()
    return transaction
  }
}
