import { Controller, Get, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get("config")
  async getProductConfig(@Query("searchQuery") searchQuery: string, @Query("category") category: string) {
    try {
      const products = await this.productsService.getProductConfig(searchQuery, category)
      return products
    }

    catch (error) {
      throw error
    }
  }
}
