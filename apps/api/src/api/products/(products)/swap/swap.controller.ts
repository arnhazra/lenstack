import { BadRequestException, Controller, Post, Get, Query, Body } from "@nestjs/common"
import { SwapService } from "./swap.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/swap")
export class SwapController {
  constructor(private readonly swapService: SwapService) { }

  @Post("txgateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      const response = await this.swapService.transactionGateway(requestBody, user.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("getswaptokenconfig")
  async getSwapTokenList(@TokenAuthorizer() user: TokenAuthorizerResponse, @Query("searchQuery") searchQuery: string) {
    try {
      const swapTokenConfig = await this.swapService.getSwapTokenList(searchQuery)
      return swapTokenConfig
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
