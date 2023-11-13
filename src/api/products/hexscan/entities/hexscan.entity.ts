import mongoose from "mongoose"
import { hexscanMongoDbConn } from "../../../../utils/dbConnect"

const HexscanTransactionSchema = new mongoose.Schema({
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

export const HexscanTransactionModel = hexscanMongoDbConn.model("transaction", HexscanTransactionSchema)
