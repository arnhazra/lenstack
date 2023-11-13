import mongoose from "mongoose"
import { edgepayMongoDbConn } from "../../../../utils/dbConnect"

const EdgepayTransactionSchema = new mongoose.Schema({
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

export const EdgepayTransactionModel = edgepayMongoDbConn.model("transaction", EdgepayTransactionSchema)
