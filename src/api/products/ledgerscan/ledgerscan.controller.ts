import { BadRequestException, Controller, Post, Req } from "@nestjs/common"
import { LedgerscanService } from "./ledgerscan.service"
import { envConfig } from "src/config/env.config"
import { CredentialAuthorizer, CredentialAuthorizerResponse } from "src/authorization/credential-authorizer.decorator"
import { statusMessages } from "src/constants/status-messages"
import { TokenCredAuthorizer, TokenCredAuthorizerResponse } from "src/authorization/token-cred-autorizer.decorator"

@Controller("products/ledgerscan")
export class LedgerscanController {
  constructor(private readonly ledgerscanService: LedgerscanService) { }

  @Post("analyzer")
  async analyze(@CredentialAuthorizer() ufc: CredentialAuthorizerResponse, @Req() req: any) {
    try {
      const queryParams = req.url.split("?")[1]
      const queryParamsWithSecretKey = `${queryParams}&apiKey=${envConfig.polygonscanSecretKey}`
      const response = await this.ledgerscanService.analyze(queryParamsWithSecretKey, ufc.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }

  @Post("analyzerui")
  async analyzeFromUI(@TokenCredAuthorizer() uftc: TokenCredAuthorizerResponse, @Req() req: any) {
    try {
      const queryParams = req.url.split("?")[1]
      const queryParamsWithSecretKey = `${queryParams}&apiKey=${envConfig.polygonscanSecretKey}`
      const response = await this.ledgerscanService.analyze(queryParamsWithSecretKey, uftc.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
