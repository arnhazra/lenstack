import { Controller, Get, Query } from "@nestjs/common"
import { ProductsService } from "./products.service"

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get("getproductconfig")
  async getProductConfig(@Query("searchQuery") searchQuery: string, @Query("category") category: string) {
    try {
      const products = await this.productsService.getProductConfig(searchQuery, category)
      return products
    }

    catch (error) {
      throw error
    }
  }

  @Get("getsolutionconfig")
  async getSolutionConfig() {
    try {
      const solutions = await this.productsService.getSolutionConfig()
      return solutions
    }

    catch (error) {
      throw error
    }
  }
}
