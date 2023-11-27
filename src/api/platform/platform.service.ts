import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { PlatformRepository } from "./platform.repositiory"

@Injectable()
export class PlatformService {
  constructor(private readonly platformRepository: PlatformRepository) { }
  async getProductConfig(searchQuery: string) {
    try {
      const products = await this.platformRepository.getproductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
