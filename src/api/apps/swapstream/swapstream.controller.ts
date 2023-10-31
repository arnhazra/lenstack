import { BadRequestException, Controller, Post, Body } from "@nestjs/common"
import { SwapstreamService } from "./swapstream.service"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { SwapstreamTransactionDto } from "./dto/swapstream-tx.dto"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("swapstream")
export class SwapstreamController {
  constructor(private readonly swapstreamService: SwapstreamService) { }

  @Post("getswapstreamtokenconfig")
  getSwapStreamTokenList(@TokenAuthorizer() userId: string) {
    try {
      return this.swapstreamService.getSwapStreamTokenList()
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() userId: string, @Body() swapstreamTransactionDto: SwapstreamTransactionDto) {
    try {
      await this.swapstreamService.createTransaction(swapstreamTransactionDto, userId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
