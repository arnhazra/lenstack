import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapstreamTransactionModel } from "./entities/swapstream.entity"

@Injectable()
export class SwapstreamRepository {
  async createTransaction(owner: string) {
    try {
      const transaction = new SwapstreamTransactionModel({ owner })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
