import { BadRequestException, Injectable } from "@nestjs/common"
import { EdgepayRepository } from "./edgepay.repository"

@Injectable()
export class EdgepayService {
  constructor(private readonly edgepayRepository: EdgepayRepository) { }

  async createTransaction(userId: string) {
    try {
      await this.edgepayRepository.createTransaction(userId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
