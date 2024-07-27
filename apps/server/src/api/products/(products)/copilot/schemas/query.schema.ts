import { Schema } from "mongoose"

export const QuerySchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "organization",
    required: true
  },

  prompt: {
    type: String,
    required: true
  },

  response: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })