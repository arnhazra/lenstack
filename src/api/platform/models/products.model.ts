import { platformMongoDbConn } from "src/utils/db-connect"
import { ProductSchema } from "../schemas/products.schema"

export const ProductModel = platformMongoDbConn.model("productconfig", ProductSchema)