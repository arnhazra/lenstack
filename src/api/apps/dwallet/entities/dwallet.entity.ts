import mongoose from "mongoose"
import { dwalletMongoDbConn } from "../../../../utils/dbConnect"

const DwalletTransactionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  from: {
    type: String,
    required: true
  },

  to: {
    type: String,
    required: true
  },

  amount: {
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
  },
}, { versionKey: false })

export const DwalletTransactionModel = dwalletMongoDbConn.model("transaction", DwalletTransactionSchema)
