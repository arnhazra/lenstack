import { BadRequestException, Controller, Post, Get, Query } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { statusMessages } from "src/constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/swap")
export class SwapController {
  constructor(private readonly swapService: SwapService) { }

  @Get("getswaptokenconfig")
  async getSwapTokenList(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("searchQuery") searchQuery: string) {
    try {
      const swapTokenConfig = await this.swapService.getSwapTokenList(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      const transaction = await this.swapService.createTransaction(ufc.workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
