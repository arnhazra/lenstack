import { Injectable, BadRequestException } from "@nestjs/common"
import { statusMessages } from "src/utils/constants/status-messages"
import { getproductConfigQuery } from "./queries/get-products.query"

@Injectable()
export class ProductsService {
  async getProductConfig(searchQuery: string, category: string) {
    try {
      const selectedFilterCategory = category === "All" || "" ? "" : category
      const products = await getproductConfigQuery(searchQuery, selectedFilterCategory)
      return products
    }

    catch (error) {
      throw new BadRequestException(statusMessages.connectionError)
    }
  }
}
