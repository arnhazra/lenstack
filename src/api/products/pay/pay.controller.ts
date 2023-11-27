import { Controller, Post, BadRequestException, Body } from "@nestjs/common"
import { PayService } from "./pay.service"
import { statusMessages } from "../../../constants/status-messages"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/pay")
export class PayController {
  constructor(private readonly payService: PayService) { }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() uftc: CredentialAuthorizerResponse) {
    try {
      const transaction = await this.payService.createTransaction(uftc.workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("signtransactiongateway")
  async signTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.payService.signTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
