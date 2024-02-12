import mongoose from "mongoose"
import { ledgerscanMongoDbConn } from "../../../../lib/db-connect"

const TransactionSchema = new mongoose.Schema({
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

export const TransactionModel = ledgerscanMongoDbConn.model("transaction", TransactionSchema)
