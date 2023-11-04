import { BadRequestException, Injectable } from "@nestjs/common"
import { SnowlakeRepository } from "./snowlake.repository"

@Injectable()
export class SnowlakeService {
  constructor(private readonly snowlakeRepository: SnowlakeRepository) { }

  async createTransaction(userId: string) {
    try {
      await this.snowlakeRepository.createTransaction(userId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
