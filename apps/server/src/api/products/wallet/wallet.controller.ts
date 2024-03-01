import { Controller, Post, BadRequestException, Body } from "@nestjs/common"
import { WalletService } from "./wallet.service"
import { statusMessages } from "../../../constants/status-messages"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      const transaction = await this.walletService.createTransaction(ufc.workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("txgateway")
  async transactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.walletService.transactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
