import { Controller, Post, BadRequestException, Get, Body } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/nftstudio")
export class NftstudioController {
  constructor(private readonly nftstudioService: NftstudioService) { }

  @Post("txgateway")
  async transactionGateway(@CredentialAuthorizer() user: CredentialAuthorizerResponse, @Body() requestBody: any) {
    try {
      const response = await this.nftstudioService.transactionGateway(requestBody, user.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Get("getnftcontractaddress")
  getNftContractAddress(@TokenAuthorizer() user: TokenAuthorizerResponse) {
    try {
      return this.nftstudioService.getNftContractAddress()
    }

    catch (error) {
      throw error
    }
  }
}
