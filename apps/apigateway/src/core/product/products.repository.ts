import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Product } from "./schemas/products.schema"
import { DbConnectionMap } from "src/shared/utils/db-connection.map"
import { Model } from "mongoose"
import { BaseRepository } from "src/shared/database/database.repository"

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
	constructor(
		@InjectModel(Product.name, DbConnectionMap.Core)
		private productModel: Model<Product>
	) {
		super(productModel)
	}
}
