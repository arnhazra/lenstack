import { BadRequestException, Injectable } from "@nestjs/common"
import { WalletRepository } from "./wallet.repository"

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) { }

  async createTransaction(workspaceId: string) {
    try {
      const transaction = await this.walletRepository.createTransaction(workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
