import { Controller, Get, Post } from "@nestjs/common"
import { CommonService } from "./common.service"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  @Post("getplatformconfig")
  getPlatformConfig() {
    try {
      return this.commonService.getPlatformConfig()
    } catch (error) {
      throw error
    }
  }

  @Post("getsubscriptionconfig")
  getSubscriptionConfig(@TokenAuthorizer() userId: string) {
    try {
      return this.commonService.getSubscriptionConfig()
    } catch (error) {
      throw error
    }
  }

  @Post("getsecretconfig")
  getSecretConfig(@TokenAuthorizer() userId: string) {
    try {
      return this.commonService.getSecretConfig()
    } catch (error) {
      throw error
    }
  }
}
