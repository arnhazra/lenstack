import { Injectable, BadRequestException } from "@nestjs/common"
import { envConfig } from "src/config/envConfig"
import { platformConfig } from "src/config/platformConfig"
import { subscriptionConfig } from "src/config/subscriptionConfig"
import { swapstreamTokenConfig } from "src/config/swapstreamTokenConfig"
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

  getContractAddresses() {
    try {
      const { tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey } = envConfig
      return { tokenContractAddress, vendorContractAddress, nftContractAddress, prototypeContractAddress, infuraApiKey }
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
