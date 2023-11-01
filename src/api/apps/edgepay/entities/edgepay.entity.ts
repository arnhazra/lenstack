import mongoose from "mongoose"
import { edgepayMongoDbConn } from "../../../../utils/dbConnect"

const EdgepayTransactionSchema = new mongoose.Schema({
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

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })

export const EdgepayTransactionModel = edgepayMongoDbConn.model("transaction", EdgepayTransactionSchema)
