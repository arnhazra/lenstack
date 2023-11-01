import { BadRequestException, Injectable } from "@nestjs/common"
import { SnowlakeTransactionModel } from "./entities/snowlake.entity"

@Injectable()
export class SnowlakeRepository {
  async createTransaction(owner: string) {
    try {
      const transaction = new SnowlakeTransactionModel({ owner })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
