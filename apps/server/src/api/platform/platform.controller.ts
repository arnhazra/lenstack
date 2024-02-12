import { Controller, Get, Query } from "@nestjs/common"
import { PlatformService } from "./platform.service"

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) { }

  @Get("getproductconfig")
  async getProductConfig(@Query("searchQuery") searchQuery: string) {
    try {
      const products = await this.platformService.getProductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw error
    }
  }
}
