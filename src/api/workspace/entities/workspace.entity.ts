import mongoose from "mongoose"
import { platformMongoDbConn } from "../../../utils/db-connect"

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  clientId: {
    type: String,
    required: true
  },

  clientSecret: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const WorkspaceModel = platformMongoDbConn.model("workspace", WorkspaceSchema)