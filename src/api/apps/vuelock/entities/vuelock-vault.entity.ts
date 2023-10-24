import mongoose from "mongoose"
import { vuelockMongoDbConn } from "../../../../utils/dbConnect"

const VuelockVaultSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  name: {
    type: String,
    required: true
  },

  vaultId: {
    type: String,
    required: true,
    unique: true,
  },

  vaultSecret: {
    type: String,
    required: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const VuelockVaultModel = vuelockMongoDbConn.model("vault", VuelockVaultSchema)