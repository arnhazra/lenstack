import { Injectable, BadRequestException } from "@nestjs/common"
import { envConfig } from "src/config/envConfig"
import { platformConfig } from "src/config/platformConfig"
import { subscriptionConfig } from "src/config/subscriptionConfig"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class CommonService {
  getPlatformConfig() {
    try {
      return platformConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  getSubscriptionConfig() {
    try {
      return subscriptionConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  getSecretConfig() {
    try {
      const { lenstackNpaWalletAddress, nftContractAddress, infuraSecret } = envConfig
      return { lenstackNpaWalletAddress, nftContractAddress, infuraSecret }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
