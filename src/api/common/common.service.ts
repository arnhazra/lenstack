import { Injectable, BadRequestException } from "@nestjs/common"
import { envConfig } from "src/config/envConfig"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class CommonService {
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
