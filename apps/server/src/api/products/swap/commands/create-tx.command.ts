import { TransactionModel } from "../models/transaction.model"

export async function createTransaction(workspaceId: string) {
  const transaction = new TransactionModel({ workspaceId })
  await transaction.save()
  return transaction
}