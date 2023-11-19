import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/db-connect"

const ProductSchema = new mongoose.Schema({
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

  largeDescription: {
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

  isAPIReferenceAvailable: {
    type: Boolean,
    required: true
  }
}, { versionKey: false })

export const ProductModel = lenstackPlatformMongoDbConn.model("productconfig", ProductSchema)