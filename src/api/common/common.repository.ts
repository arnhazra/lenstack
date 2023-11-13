import { Injectable } from "@nestjs/common"
import { ProductModel } from "./entity/productconfig.entity"

@Injectable()
export class CommonRepository {
  async getproductConfig(searchQuery: string) {
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { largeDescription: { $regex: searchQuery, $options: "i" } }
      ]
    })

    return products
  }
}
