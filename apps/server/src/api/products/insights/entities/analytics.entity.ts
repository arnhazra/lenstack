import mongoose from "mongoose"
import { insightsMongoDbConn } from "../../../../utils/db-connect"

const AnalyticsSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  component: {
    type: String,
    required: true
  },

  event: {
    type: String,
    required: true
  },

  info: {
    type: String,
    required: true
  },

  statusCode: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const AnalyticsModel = insightsMongoDbConn.model("analytics", AnalyticsSchema)