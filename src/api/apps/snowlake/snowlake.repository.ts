import { BadRequestException, Injectable } from "@nestjs/common"
import { SnowlakeTransactionModel } from "./entities/snowlake.entity"

@Injectable()
export class SnowlakeRepository {
  async createTransaction(owner: string, apiKey: string) {
    try {
      const transaction = new SnowlakeTransactionModel({ owner, apiKey })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findCountByApiKey(apiKey: string) {
    const snowlakeUsedCredits = await SnowlakeTransactionModel.find({ apiKey }).countDocuments()
    return snowlakeUsedCredits
  }
}
