import mongoose from "mongoose"
import { insightsMongoDbConn } from "../../../../utils/db-connect"

const InsightsAnalyticsSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
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

export const InsightsAnalyticsModel = insightsMongoDbConn.model("analytics", InsightsAnalyticsSchema)