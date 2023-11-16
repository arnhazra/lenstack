import { Controller, Post, Body } from "@nestjs/common"
import { PlatformService } from "./platform.service"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("platform")
export class PlatformController {
  constructor(private readonly platformService: PlatformService) { }

  @Post("getproductconfig")
  async getProductConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body("searchQuery") searchQuery: string) {
    try {
      const products = await this.platformService.getProductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw error
    }
  }

  @Post("getsecretconfig")
  getSecretConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.platformService.getSecretConfig()
    }

    catch (error) {
      throw error
    }
  }
}
