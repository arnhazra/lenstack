import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/constants/status-messages"
import { getproductConfigQuery } from "./queries/get-product-config.query"

@Injectable()
export class ProductsService {
  async getProductConfig(searchQuery: string) {
    try {
      const products = await getproductConfigQuery(searchQuery)
      return products
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
