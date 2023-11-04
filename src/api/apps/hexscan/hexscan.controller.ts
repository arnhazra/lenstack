import { BadRequestException, Controller, Post, Req } from "@nestjs/common"
import { HexscanService } from "./hexscan.service"
import { envConfig } from "src/config/envConfig"
import Constants from "client/_constants/appConstants"
import { ApiKeyAuthorizer } from "src/authorization/apikeyauthorizer/apikeyauthorizer.decorator"

@Controller("hexscan")
export class HexscanController {
  constructor(private readonly hexscanService: HexscanService) { }

  @Post("analyzer")
  async analyze(@ApiKeyAuthorizer() userId: string, @Req() req: any) {
    try {
      const queryParams = req.url.split('?')[1]
      const queryParamsWithSecretKey = `${queryParams}&apiKey=${envConfig.polygonscanSecretKey}`
      const response = await this.hexscanService.analyze(queryParamsWithSecretKey, userId)
      return response
    }

    catch (error) {
      throw new BadRequestException(Constants.ConnectionErrorMessage)
    }
  }
}
