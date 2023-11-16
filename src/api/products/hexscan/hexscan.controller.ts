import { BadRequestException, Controller, Post, Req } from "@nestjs/common"
import { HexscanService } from "./hexscan.service"
import { envConfig } from "src/config/envConfig"
import { ApiKeyAuthorizer, ApiKeyAuthorizerReturnType } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"
import { statusMessages } from "src/constants/statusMessages"

@Controller("products/hexscan")
export class HexscanController {
  constructor(private readonly hexscanService: HexscanService) { }

  @Post("analyzer")
  async analyze(@ApiKeyAuthorizer() ufak: ApiKeyAuthorizerReturnType, @Req() req: any) {
    try {
      const queryParams = req.url.split("?")[1]
      const queryParamsWithSecretKey = `${queryParams}&apiKey=${envConfig.polygonscanSecretKey}`
      const response = await this.hexscanService.analyze(queryParamsWithSecretKey, ufak.workspaceId)
      return response
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
