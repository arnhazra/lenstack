import mongoose from "mongoose"
import { mongoDbConn } from "../../../../utils/dbConnect"

const SwapstreamTransactionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  tokenContractAddress: {
    type: String,
    required: true
  },

  amount: {
    type: String,
    required: true
  },

  transactionType: {
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

export const SwapstreamTransactionModel = mongoDbConn.model("swapstreamtransaction", SwapstreamTransactionSchema)
