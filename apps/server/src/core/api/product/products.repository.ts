import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Product } from "./schemas/products.schema"
import { DbConnectionMap } from "src/utils/db-connection.map"
import { Model } from "mongoose"

@Injectable()
export class ProductsRepository {
  constructor(@InjectModel(Product.name, DbConnectionMap.Core) private model: Model<Product>) { }

  async getProductConfig(searchQuery: string, category: string) {
    const selectedFilterCategory = category === "All" || "" ? "" : category

    return await this.model.find({
      $or: [
        { productName: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ],
      productCategory: { $regex: selectedFilterCategory }
    }).sort("productName")
  }
}
