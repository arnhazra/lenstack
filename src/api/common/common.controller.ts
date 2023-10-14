import { Controller, Get, Post } from "@nestjs/common"
import { CommonService } from "./common.service"

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
  getSubscriptionConfig() {
    try {
      return this.commonService.getSubscriptionConfig()
    } catch (error) {
      throw error
    }
  }

  @Post("getsecretconfig")
  getSecretConfig() {
    try {
      return this.commonService.getSecretConfig()
    } catch (error) {
      throw error
    }
  }
}
