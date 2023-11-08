import { BadRequestException, Injectable } from "@nestjs/common"
import { SwapstreamTransactionModel } from "./entities/swapstream.entity"

@Injectable()
export class SwapstreamRepository {
  async createTransaction(workspaceId: string) {
    try {
      const transaction = new SwapstreamTransactionModel({ workspaceId })
      await transaction.save()
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
