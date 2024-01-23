import { Schema } from "mongoose"

export const QuerySchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace",
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