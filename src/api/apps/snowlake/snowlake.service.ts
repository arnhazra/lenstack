import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/snowlake-tx.dto"
import { SnowlakeRepository } from "./snowlake.repository"

@Injectable()
export class SnowlakeService {
  constructor(private readonly snowlakeRepository: SnowlakeRepository) { }

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const { apiKey } = createTransactionDto
      await this.snowlakeRepository.createTransaction(userId, apiKey)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
