import { BadRequestException, Injectable } from "@nestjs/common"
import { NftstudioTransactionModel } from "./entities/nftstudio.entity"

@Injectable()
export class NftstudioRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new NftstudioTransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
