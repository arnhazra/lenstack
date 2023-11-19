import mongoose from "mongoose"
import { ledgerscanMongoDbConn } from "../../../../utils/db-connect"

const LedgerscanTransactionSchema = new mongoose.Schema({
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

export const LedgerscanTransactionModel = ledgerscanMongoDbConn.model("transaction", LedgerscanTransactionSchema)
