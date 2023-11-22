import { BadRequestException, Injectable } from "@nestjs/common"
import { TransactionModel } from "./entities/transaction.entity"

@Injectable()
export class PayRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new TransactionModel({ workspaceId })
      await transaction.save()
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
