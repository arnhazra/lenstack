import { Controller, Post, BadRequestException, Body, Get } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { statusMessages } from "../../../../constants/status-messages"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("products/wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post("txgateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      const response = await this.walletService.transactionGateway(requestBody, user.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("gettransactions")
  async getTransactions(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      const transactions = await this.walletService.getTransactions(user.workspaceId)
      return transactions
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
