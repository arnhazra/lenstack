import { Controller, Get, Redirect } from "@nestjs/common"
import { devUri, prodUri } from "./shared/utils/constants/other-constants"
import { envConfig } from "./env.config"

@Controller()
export class AppController {
  @Get("/")
  @Redirect(envConfig.nodeEnv === "development" ? devUri : prodUri, 302)
  redirectToUI() {
    return
  }
}
