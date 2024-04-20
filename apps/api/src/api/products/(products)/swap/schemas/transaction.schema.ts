import { Schema } from "mongoose"

export const TransactionSchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })