import mongoose from "mongoose"
import { insightsMongoDbConn } from "../../../../utils/db-connect"

const ProjectSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace"
  },

  name: {
    type: String,
    required: true
  },

  projectId: {
    type: String,
    required: true,
    unique: true,
  },

  projectPasskey: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const ProjectModel = insightsMongoDbConn.model("project", ProjectSchema)