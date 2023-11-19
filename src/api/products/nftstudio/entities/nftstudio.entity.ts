import mongoose from "mongoose"
import { nftstudioMongoDbConn } from "../../../../utils/db-connect"

const NftstudioTransactionSchema = new mongoose.Schema({
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

export const NftstudioTransactionModel = nftstudioMongoDbConn.model("transaction", NftstudioTransactionSchema)
