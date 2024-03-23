import { platformDatabaseConn } from "src/lib/connect-databases"
import { ProductSchema } from "../schemas/products.schema"

export const ProductModel = platformDatabaseConn.model("productconfig", ProductSchema)