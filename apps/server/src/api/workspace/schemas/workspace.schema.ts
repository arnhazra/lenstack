import { Schema } from "mongoose"

export const WorkspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  clientId: {
    type: String,
    required: true
  },

  clientSecret: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })