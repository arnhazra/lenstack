import { BadRequestException, Injectable } from "@nestjs/common"
import { SnowlakeTransactionModel } from "./entities/snowlake.entity"

@Injectable()
export class SnowlakeRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new SnowlakeTransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
