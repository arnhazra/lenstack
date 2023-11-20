import { BadRequestException, Injectable } from "@nestjs/common"
import { PayRepository } from "./pay.repository"

@Injectable()
export class PayService {
  constructor(private readonly payRepository: PayRepository) { }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.payRepository.createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
