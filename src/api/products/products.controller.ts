import { Body, Controller, Post } from "@nestjs/common"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post("getproductconfig")
  async getProductConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body("searchQuery") searchQuery: string) {
    try {
      const products = await this.productsService.getProductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw error
    }
  }
}
