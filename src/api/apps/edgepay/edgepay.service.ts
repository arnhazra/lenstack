import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/edgepay-tx"
import { EdgepayRepository } from "./edgepay.repository"

@Injectable()
export class EdgepayService {
  constructor(private readonly edgepayRepository: EdgepayRepository) { }

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const { from, to, amount } = createTransactionDto
      await this.edgepayRepository.createTransaction(userId, from, to, amount)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
