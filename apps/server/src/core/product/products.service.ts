import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/utils/constants/status-messages"
import { QueryBus } from "@nestjs/cqrs"
import { GetProductsQuery } from "./queries/impl/get-products.query"
import { Product } from "./schemas/products.schema"

@Injectable()
export class ProductsService {
  constructor(private readonly queryBus: QueryBus) { }

  async getProductConfig(searchQuery: string, category: string) {
    try {
      const selectedFilterCategory = category === "All" || "" ? "" : category
      return await this.queryBus.execute<GetProductsQuery, Product[]>(new GetProductsQuery(searchQuery, selectedFilterCategory))
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
