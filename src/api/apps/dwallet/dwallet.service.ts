import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/dwallet-tx"
import { DwalletRepository } from "./dwallet.repository"

@Injectable()
export class DwalletService {
  constructor(private readonly dwalletRepository: DwalletRepository) { }

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const { from, to, apiKey, amount } = createTransactionDto
      await this.dwalletRepository.createTransaction(userId, from, to, apiKey, amount)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
