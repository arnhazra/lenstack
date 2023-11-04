import mongoose from "mongoose"
import { hexscanMongoDbConn } from "../../../../utils/dbConnect"

const HexscanTransactionSchema = new mongoose.Schema({
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

export const HexscanTransactionModel = hexscanMongoDbConn.model("transaction", HexscanTransactionSchema)
