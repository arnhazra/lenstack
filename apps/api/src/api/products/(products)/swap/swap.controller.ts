import { BadRequestException, Controller, Post, Get, Query, Body } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { statusMessages } from "src/constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/swap")
export class SwapController {
  constructor(private readonly swapService: SwapService) { }

  @Post("txgateway")
  async transactionGateway(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      const response = await this.swapService.transactionGateway(requestBody, ufc.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

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
}
