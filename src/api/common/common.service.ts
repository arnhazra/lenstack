import { Injectable, BadRequestException } from "@nestjs/common"
import { envConfig } from "src/config/envConfig"
import { statusMessages } from "src/constants/statusMessages"
import { CommonRepository } from "./common.repository"

@Injectable()
export class CommonService {
  constructor(private readonly commonRepository: CommonRepository) { }
  async getProductConfig(searchQuery: string) {
    try {
      const products = await this.commonRepository.getproductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  getSecretConfig() {
    try {
      const { lenstackNpaWalletAddress, nftContractAddress, infuraGateway, quicknodeGateway, alchemyGateway } = envConfig
      return { lenstackNpaWalletAddress, nftContractAddress, infuraGateway, quicknodeGateway, alchemyGateway }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
