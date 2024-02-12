import { BadRequestException } from "@nestjs/common"
import { TransactionModel } from "../models/transaction.model"

export async function createTransactionCommand(workspaceId: string) {
  try {
    const transaction = new TransactionModel({ workspaceId })
    await transaction.save()
    return transaction
  }

  catch (error) {
    throw new BadRequestException()
  }
}
