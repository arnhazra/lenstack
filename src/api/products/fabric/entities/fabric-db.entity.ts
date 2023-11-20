import mongoose from "mongoose"
import { fabricMongoDbConn } from "../../../../utils/db-connect"

const FabricDbSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace"
  },

  name: {
    type: String,
    required: true
  },

  dbId: {
    type: String,
    required: true,
    unique: true,
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

export const FabricDbModel = fabricMongoDbConn.model("databases", FabricDbSchema)