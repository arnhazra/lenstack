import { Schema } from "mongoose"
import { analyticsDatabaseConn } from "src/lib/connect-databases"

export const AnalyticsSchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
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

export const AnalyticsModel = analyticsDatabaseConn.model("analytics", AnalyticsSchema)