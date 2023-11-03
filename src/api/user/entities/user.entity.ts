import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/dbConnect"

export interface NewUser {
  email: string
  privateKey: string
}

export interface User extends Document {
  email: string
  createdAt?: Date
  role?: string
  privateKey: string
  trialAvailable?: boolean
}

const UserSchema = new mongoose.Schema<User>({
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
}, { versionKey: false })

export const UserModel = lenstackPlatformMongoDbConn.model("user", UserSchema)
