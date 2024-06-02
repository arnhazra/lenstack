import { Schema } from "mongoose"

export const InsightsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  module: {
    type: String,
    required: true
  },

  method: {
    type: String,
    required: true
  },

  api: {
    type: String,
    required: true
  }
}, { versionKey: false })
