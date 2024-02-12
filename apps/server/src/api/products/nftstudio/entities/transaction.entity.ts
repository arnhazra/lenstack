import mongoose from "mongoose"
import { nftstudioMongoDbConn } from "../../../../lib/db-connect"

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

export const TransactionModel = nftstudioMongoDbConn.model("transaction", TransactionSchema)
