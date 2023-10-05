import mongoose from "mongoose"
import { masterDb } from "../../../../utils/dbConnect"

const FrostlakeProjectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  name: {
    type: String,
    required: true
  },

  clientId: {
    type: String,
    required: true,
    unique: true,
  },

  clientSecret: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const FrostlakeProjectModel = masterDb.model("frostlakeproject", FrostlakeProjectSchema)