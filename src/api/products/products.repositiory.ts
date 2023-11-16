import { Injectable } from "@nestjs/common"
import { ProductModel } from "./products.entity"

@Injectable()
export class ProductsRepository {
  async getproductConfig(searchQuery: string) {
    const products = await ProductModel.find({
      $or: [
        { productName: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { largeDescription: { $regex: searchQuery, $options: "i" } }
      ]
    }).sort("productName")

    return products
  }
}
