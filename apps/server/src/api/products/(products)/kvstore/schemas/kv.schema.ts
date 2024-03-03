import { Schema } from "mongoose"

export const KvSchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  key: {
    type: String,
    required: true
  },

  value: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })