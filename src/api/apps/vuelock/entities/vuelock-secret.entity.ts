import mongoose from "mongoose"
import { vuelockMongoDbConn } from "../../../../utils/dbConnect"

const VuelockSecretSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  vaultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vault",
    required: true
  },

  key: {
    type: String,
    required: true
  },

  secretValue: {
    type: String,
    required: true
  },

  apiKey: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const VuelockSecretModel = vuelockMongoDbConn.model("secrets", VuelockSecretSchema)