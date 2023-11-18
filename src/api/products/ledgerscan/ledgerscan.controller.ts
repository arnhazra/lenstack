import { BadRequestException, Controller, Post, Req } from "@nestjs/common"
import { LedgerscanService } from "./ledgerscan.service"
import { envConfig } from "src/config/env.config"
import { ApiKeyAuthorizer, ApiKeyAuthorizerResponse } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"

@Controller("products/ledgerscan")
export class LedgerscanController {
  constructor(private readonly ledgerscanService: LedgerscanService) { }

  @Post("analyzer")
  async analyze(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerResponse, @Req() req: any) {
    try {
      const queryParams = req.url.split("?")[1]
      const queryParamsWithSecretKey = `${queryParams}&apiKey=${envConfig.polygonscanSecretKey}`
      const response = await this.ledgerscanService.analyze(queryParamsWithSecretKey, ufak.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
