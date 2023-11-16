import { Injectable, BadRequestException } from "@nestjs/common"
import { envConfig } from "src/config/envConfig"
import { statusMessages } from "src/constants/statusMessages"
import { PlatformRepository } from "./platform.repositiory"

@Injectable()
export class PlatformService {
  constructor(private readonly platformRepository: PlatformRepository) { }
  getSecretConfig() {
    try {
      const { lenstackNpaWalletAddress, nftContractAddress, infuraGateway, quicknodeGateway, alchemyGateway } = envConfig
      return { lenstackNpaWalletAddress, nftContractAddress, infuraGateway, quicknodeGateway, alchemyGateway }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

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
