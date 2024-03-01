import { Schema } from "mongoose"

export const MetadataSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true
  }
}, { versionKey: false })

