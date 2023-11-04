import mongoose from "mongoose"
import { swapstreamMongoDbConn } from "../../../../utils/dbConnect"

const SwapstreamTransactionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })

export const SwapstreamTransactionModel = swapstreamMongoDbConn.model("transaction", SwapstreamTransactionSchema)
