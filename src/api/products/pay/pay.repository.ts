import { BadRequestException, Injectable } from "@nestjs/common"
import { PayTransactionModel } from "./entities/pay.entity"

@Injectable()
export class PayRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new PayTransactionModel({ workspaceId })
      await transaction.save()
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
