import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
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

  @Post("getcontractaddresses")
  getContractAddresses() {
    try {
      return this.commonService.getContractAddresses()
    } catch (error) {
      throw error
    }
  }
}
