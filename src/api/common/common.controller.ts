import { Controller, Post } from "@nestjs/common"
import { CommonService } from "./common.service"
import { TokenAuthorizer, TokenAuthorizerReturnType } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post("getplatformconfig")
  getPlatformConfig(@TokenAuthorizer() uft: TokenAuthorizerReturnType) {
    try {
      return this.commonService.getPlatformConfig()
    } catch (error) {
      throw error
    }
  }

  @Post("getsubscriptionconfig")
  getSubscriptionConfig(@TokenAuthorizer() uft: TokenAuthorizerReturnType) {
    try {
      return this.commonService.getSubscriptionConfig()
    } catch (error) {
      throw error
    }
  }

  @Post("getsecretconfig")
  getSecretConfig(@TokenAuthorizer() uft: TokenAuthorizerReturnType) {
    try {
      return this.commonService.getSecretConfig()
    } catch (error) {
      throw error
    }
  }
}
