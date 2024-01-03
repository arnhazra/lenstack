import mongoose from "mongoose"

export const ProductSchema = new mongoose.Schema({
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

