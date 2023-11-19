import mongoose from "mongoose"
import { insightsMongoDbConn } from "../../../../utils/db-connect"

const InsightsProjectSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace"
  },

  name: {
    type: String,
    required: true
  },

  clientId: {
    type: String,
    required: true,
    unique: true,
  },

  clientSecret: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const InsightsProjectModel = insightsMongoDbConn.model("project", InsightsProjectSchema)