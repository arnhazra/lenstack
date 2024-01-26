import { BadRequestException, Injectable } from "@nestjs/common"
import { NftstudioRepository } from "./nftstudio.repository"
import { envConfig } from "src/env.config"
import { statusMessages } from "src/constants/status-messages"

@Injectable()
export class NftstudioService {
  constructor(private readonly nftstudioRepository: NftstudioRepository) { }

  async createTransaction(workspaceId: string) {
    try {
      await this.nftstudioRepository.createTransaction(workspaceId)
      return { success: true }
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  getNftContractAddress() {
    try {
      const { nftContractAddress } = envConfig
      return { nftContractAddress }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
