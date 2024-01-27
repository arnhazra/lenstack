import mongoose from "mongoose"
import { swapMongoDbConn } from "../../../../utils/db-connect"

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

export const TransactionModel = swapMongoDbConn.model("transaction", TransactionSchema)
