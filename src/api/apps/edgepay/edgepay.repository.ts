import { BadRequestException, Injectable } from "@nestjs/common"
import { EdgepayTransactionModel } from "./entities/edgepay.entity"

@Injectable()
export class EdgepayRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new EdgepayTransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
