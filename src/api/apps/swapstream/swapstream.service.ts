import { BadRequestException, Injectable } from '@nestjs/common'
import { swapstreamTokenConfig } from "src/config/swapstreamTokenConfig"
import { statusMessages } from "src/constants/statusMessages"

@Injectable()
export class SwapstreamService {
  getSwapStreamTokenList() {
    try {
      return swapstreamTokenConfig
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
