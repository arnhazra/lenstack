import { Controller, Get, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get("config")
  async getProductConfig(@Query("searchQuery") searchQuery: string, @Query("category") category: string) {
    try {
      return await this.productsService.getProductConfig(searchQuery, category)
    }

    catch (error) {
      throw error
    }
  }
}
