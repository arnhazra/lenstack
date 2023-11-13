import { BadRequestException, Injectable } from "@nestjs/common"
import { EdgepayRepository } from "./edgepay.repository"

@Injectable()
export class EdgepayService {
  constructor(private readonly edgepayRepository: EdgepayRepository) { }

  async createTransaction(workspaceId: string) {
    try {
      await this.edgepayRepository.createTransaction(workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
