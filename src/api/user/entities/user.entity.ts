import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/dbConnect"

export interface NewUser {
  email: string
  privateKey: string
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  role: {
    type: String,
    default: "user"
  },

  privateKey: {
    type: String,
    required: true
  },

  trialAvailable: {
    type: Boolean,
    default: true
  },

  selectedWorkspaceId: {
    type: mongoose.Schema.Types.ObjectId,
  }
}, { versionKey: false })

export const UserModel = lenstackPlatformMongoDbConn.model("user", UserSchema)
