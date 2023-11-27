import { Controller, Post, BadRequestException, Body } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { statusMessages } from "../../../constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/nftstudio")
export class NftstudioController {
  constructor(private readonly nftstudioService: NftstudioService) { }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() uftc: CredentialAuthorizerResponse) {
    try {
      await this.nftstudioService.createTransaction(uftc.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("signtransactiongateway")
  async signTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.nftstudioService.signTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("getnftcontractaddress")
  getNftContractAddress(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.nftstudioService.getNftContractAddress()
    }

    catch (error) {
      throw error
    }
  }
}
