import { Schema } from "mongoose"
import { fabricMongoDbConn } from "../../../../utils/db-connect"

const DbSchema = new Schema({
  workspaceId: {
    type: Schema.Types.ObjectId,
    ref: "workspace"
  },

  name: {
    type: String,
    required: true
  },

  dbPassword: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const DbModel = fabricMongoDbConn.model("databases", DbSchema)