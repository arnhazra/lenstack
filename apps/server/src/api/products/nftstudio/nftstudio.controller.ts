import { Controller, Post, BadRequestException, Get } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { statusMessages } from "../../../constants/status-messages"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"

@Controller("products/nftstudio")
export class NftstudioController {
  constructor(private readonly nftstudioService: NftstudioService) { }

  @Post("createtx")
  async createTransaction(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse) {
    try {
      return await this.nftstudioService.createTransaction(ufc.workspaceId)
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Get("getnftcontractaddress")
  getNftContractAddress(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.nftstudioService.getNftContractAddress()
    }

    catch (error) {
      throw error
    }
  }
}
