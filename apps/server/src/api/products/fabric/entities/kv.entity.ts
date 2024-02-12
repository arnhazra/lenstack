import mongoose from "mongoose"
import { fabricMongoDbConn } from "../../../../lib/db-connect"

const KvSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
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

export const KvModel = fabricMongoDbConn.model("kv", KvSchema)