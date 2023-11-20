import { BadRequestException, Injectable } from "@nestjs/common"
import { NftstudioRepository } from "./nftstudio.repository"

@Injectable()
export class NftstudioService {
  constructor(private readonly nftstudioRepository: NftstudioRepository) { }

  async createTransaction(workspaceId: string) {
    try {
      await this.nftstudioRepository.createTransaction(workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
