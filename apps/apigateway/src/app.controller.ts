import { Controller, Get, Redirect } from "@nestjs/common"
import { devUIUri, prodUIUri } from "./shared/utils/constants/other-constants"
import { envConfig } from "./config"

@Controller()
export class AppController {
  @Get("/")
  @Redirect(envConfig.nodeEnv === "development" ? devUIUri : prodUIUri, 302)
  redirectToUI() {
    return
  }
}
