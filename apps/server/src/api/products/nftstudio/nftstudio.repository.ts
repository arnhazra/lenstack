import { BadRequestException, Injectable } from "@nestjs/common"
import { TransactionModel } from "./entities/transaction.entity"

@Injectable()
export class NftstudioRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new TransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
