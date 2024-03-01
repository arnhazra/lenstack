import { BadRequestException, Injectable } from "@nestjs/common"
import { envConfig } from "src/env.config"
import { statusMessages } from "src/constants/status-messages"
import { createTransaction } from "./commands/create-tx.command"

@Injectable()
export class NftstudioService {
  async createTransaction(workspaceId: string) {
    try {
      await createTransaction(workspaceId)
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
