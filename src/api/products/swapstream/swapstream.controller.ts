import { BadRequestException, Controller, Post, Body } from "@nestjs/common"
import { SwapstreamService } from "./swapstream.service"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { SearchTokensDto } from "./entities/search-tokens.dto"

@Controller("products/swapstream")
export class SwapstreamController {
  constructor(private readonly swapstreamService: SwapstreamService) { }

  @Post("getswapstreamtokenconfig")
  async getSwapStreamTokenList(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchTokensDto: SearchTokensDto) {
    try {
      const { searchQuery } = searchTokensDto
      const swapstreamTokenConfig = await this.swapstreamService.getSwapStreamTokenList(searchQuery)
      return swapstreamTokenConfig
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse) {
    try {
      await this.swapstreamService.createTransaction(ufak.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
