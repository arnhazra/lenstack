import { BadRequestException, Controller, Post, Body } from "@nestjs/common"
import { SwapstreamService } from "./swapstream.service"
import { ApiKeyAuthorizer, ApiKeyAuthorizerReturnType } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("swapstream")
export class SwapstreamController {
  constructor(private readonly swapstreamService: SwapstreamService) { }

  @Post("getswapstreamtokenconfig")
  async getSwapStreamTokenList(@TokenAuthorizer() uft: TokenAuthorizerReturnType, @Body("searchQuery") searchQuery: string) {
    try {
      const swapstreamTokenConfig = await this.swapstreamService.getSwapStreamTokenList(searchQuery)
      return swapstreamTokenConfig
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType) {
    try {
      await this.swapstreamService.createTransaction(ufak.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
