import { platformDatabaseConn } from "src/lib/db-connect"
import { ProductSchema } from "../schemas/products.schema"

export const ProductModel = platformDatabaseConn.model("productconfig", ProductSchema)