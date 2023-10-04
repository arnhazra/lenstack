import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../utils/dbConnect"

export interface NewUser {
  name: string
  email: string
  privateKey: string
}

export interface User extends Document {
  name: string
  email: string
  createdAt?: Date
  role?: string
  privateKey: string
  trialAvailable?: boolean
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true
  },

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

const MasterUserModel = masterDb.model("user", UserSchema)
const ReplicaUserModel = replicaDb.model("user", UserSchema)

export { MasterUserModel, ReplicaUserModel }