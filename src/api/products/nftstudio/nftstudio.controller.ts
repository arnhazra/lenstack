import { Controller, Post, BadRequestException } from "@nestjs/common"
import { NftstudioService } from "./nftstudio.service"
import { statusMessages } from "../../../constants/status-messages"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikey-authorizer.decorator"

@Controller("products/nftstudio")
export class NftstudioController {
  constructor(private readonly nftstudioService: NftstudioService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse) {
    try {
      await this.nftstudioService.createTransaction(ufak.workspaceId)
      return true
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
