import { Schema } from "mongoose"
import { platformDatabaseConn } from "src/utils/connect-databases"

export const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },

  displayName: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  productStatus: {
    type: String,
    required: true
  },

  productCategory: {
    type: String,
    required: true
  },

  productIcon: {
    type: String,
    required: true
  }
}, { versionKey: false })

export const ProductModel = platformDatabaseConn.model("productconfig", ProductSchema)