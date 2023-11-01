import { BadRequestException, Injectable } from "@nestjs/common"
import { EdgepayTransactionModel } from "./entities/edgepay.entity"

@Injectable()
export class EdgepayRepository {
  async createTransaction(owner: string, from: string, to: string, amount: string) {
    try {
      const transaction = new EdgepayTransactionModel({ owner, from, to, amount })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
