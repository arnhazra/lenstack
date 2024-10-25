import { Controller, Get, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("config")
  async getProductConfig() {
    try {
      return await this.productsService.getProductConfig();
    } catch (error) {
      throw error;
    }
  }
}
