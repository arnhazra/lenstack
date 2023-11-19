import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/db-connect"

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

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const WorkspaceModel = lenstackPlatformMongoDbConn.model("workspace", WorkspaceSchema)