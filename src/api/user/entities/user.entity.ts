import mongoose from "mongoose"
import { platformMongoDbConn } from "../../../utils/db-connect"

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

export const UserModel = platformMongoDbConn.model("user", UserSchema)
