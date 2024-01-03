import { Schema } from "mongoose"

export const ActivitySchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  activityDescription: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })