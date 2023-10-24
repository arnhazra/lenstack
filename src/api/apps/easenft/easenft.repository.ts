import { BadRequestException, Injectable } from "@nestjs/common"
import { EasenftTransactionModel } from "./entities/easenft.entity"

@Injectable()
export class EasenftRepository {
  async createTransaction(owner: string, apiKey: string, txId: string) {
    try {
      const transaction = new EasenftTransactionModel({ owner, apiKey, txId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async findAllNftsByUserId(owner: string) {
    const allNfts = await EasenftTransactionModel.find({ owner })
    return allNfts
  }

  async findCountByApiKey(apiKey: string) {
    const easenftUsedCredits = await EasenftTransactionModel.find({ apiKey }).countDocuments()
    return easenftUsedCredits
  }
}
