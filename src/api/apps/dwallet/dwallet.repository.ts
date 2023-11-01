import { BadRequestException, Injectable } from "@nestjs/common"
import { DwalletTransactionModel } from "./entities/dwallet.entity"

@Injectable()
export class DwalletRepository {
  async createTransaction(owner: string, from: string, to: string, apiKey: string, amount: string) {
    try {
      const transaction = new DwalletTransactionModel({ owner, from, to, apiKey, amount })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
