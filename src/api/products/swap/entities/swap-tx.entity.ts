import mongoose from "mongoose"
import { swapMongoDbConn } from "../../../../utils/db-connect"

const SwapTransactionSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })

export const SwapTransactionModel = swapMongoDbConn.model("transaction", SwapTransactionSchema)
