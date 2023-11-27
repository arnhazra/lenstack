import { BadRequestException, Controller, Post, Body } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { statusMessages } from "src/constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { SearchTokensDto } from "./dto/search-tokens.dto"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/swap")
export class SwapController {
  constructor(private readonly swapService: SwapService) { }

  @Post("getswaptokenconfig")
  async getSwapTokenList(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() searchTokensDto: SearchTokensDto) {
    try {
      const { searchQuery } = searchTokensDto
      const swapTokenConfig = await this.swapService.getSwapTokenList(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() uftc: CredentialAuthorizerResponse) {
    try {
      const transaction = await this.swapService.createTransaction(uftc.workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("signtransactiongateway")
  async signTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.swapService.signTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
