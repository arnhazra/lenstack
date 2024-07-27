import { Schema } from "mongoose"
import { kvstoreDatabaseConn } from "src/lib/connect-databases"

export const KvSchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "organization",
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

export const KvModel = kvstoreDatabaseConn.model("kv", KvSchema)