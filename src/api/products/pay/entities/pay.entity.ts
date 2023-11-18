import mongoose from "mongoose"
import { payMongoDbConn } from "../../../../utils/dbConnect"

const PayTransactionSchema = new mongoose.Schema({
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

export const PayTransactionModel = payMongoDbConn.model("transaction", PayTransactionSchema)
