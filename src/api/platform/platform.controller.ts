import { Controller, Get, Query } from "@nestjs/common"
import { PlatformService } from "./platform.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) { }

  @Get("getproductconfig")
  async getProductConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Query("searchQuery") searchQuery: string) {
    try {
      const products = await this.platformService.getProductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw error
    }
  }
}
