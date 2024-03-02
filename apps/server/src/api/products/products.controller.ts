import { Controller, Get, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  @Get("getproductconfig")
  async getProductConfig(@Query("searchQuery") searchQuery: string) {
    try {
      const products = await this.ProductsService.getProductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw error
    }
  }
}
