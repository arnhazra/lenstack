import { BadRequestException } from "@nestjs/common"
import { TransactionModel } from "../models/transaction.model"

export async function getTransactionsQuery(workspaceId: string) {
  try {
    const transactions = await TransactionModel.find({ workspaceId }).sort({ createdAt: -1 }).limit(20)
    return transactions
  }

  catch (error) {
    throw new BadRequestException()
  }
}
