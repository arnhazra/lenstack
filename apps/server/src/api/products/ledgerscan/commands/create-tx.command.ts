import { TransactionModel } from "../models/transaction.model"

export async function createNewTransactionCommand(workspaceId: string) {
  const transaction = await new TransactionModel({ workspaceId }).save()
  return transaction
}