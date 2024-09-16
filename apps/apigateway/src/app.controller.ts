import { Controller, Get, Redirect } from '@nestjs/common'
import { otherConstants } from "./shared/utils/constants/other-constants"

@Controller()
export class AppController {
  @Get('/')
  @Redirect(otherConstants.tokenIssuer, 302)
  redirectToUI() {
    return
  }
}
