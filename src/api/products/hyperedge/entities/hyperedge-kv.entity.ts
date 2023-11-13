import mongoose from "mongoose"
import { hyperedgeMongoDbConn } from "../../../../utils/dbConnect"

const HyperedgeKvSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  dbId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "database",
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

export const HyperedgeKvModel = hyperedgeMongoDbConn.model("kv", HyperedgeKvSchema)