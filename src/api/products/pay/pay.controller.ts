import { Controller, Post, BadRequestException } from "@nestjs/common"
import { PayService } from "./pay.service"
import { statusMessages } from "../../../constants/statusMessages"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("products/pay")
export class PayController {
  constructor(private readonly payService: PayService) { }

  @Post("createtx")
  async createTransaction(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse) {
    try {
      const transaction = await this.payService.createTransaction(ufak.workspaceId)
      return transaction
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
