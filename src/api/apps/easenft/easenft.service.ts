import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateTransactionDto } from "./dto/easenft-tx.dto"
import { EasenftRepository } from "./easenft.repository"

@Injectable()
export class EasenftService {
  constructor(private readonly easenftRepository: EasenftRepository) { }

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string) {
    try {
      const { apiKey, txId } = createTransactionDto
      await this.easenftRepository.createTransaction(userId, apiKey, txId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getMyNfts(userId: string) {
    try {
      const nftList = await this.easenftRepository.findAllNftsByUserId(userId)
      return nftList
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
