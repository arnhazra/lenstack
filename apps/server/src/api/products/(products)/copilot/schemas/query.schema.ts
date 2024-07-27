import { Schema } from "mongoose"
import { copilotDatabaseConn } from "src/lib/connect-databases"

export const QuerySchema = new Schema({
  orgId: {
    type: Schema.Types.ObjectId,
    ref: "organization",
    required: true
  },

  prompt: {
    type: String,
    required: true
  },

  response: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const QueryModel = copilotDatabaseConn.model("query", QuerySchema)