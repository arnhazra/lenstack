import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/statusMessages"
import { ProductsRepository } from "./products.repositiory"

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) { }

  async getProductConfig(searchQuery: string) {
    try {
      const products = await this.productsRepository.getproductConfig(searchQuery)
      return products
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
