import mongoose from "mongoose"
import { easenftMongoDbConn } from "../../../../utils/dbConnect"

const EasenftTransactionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  apiKey: {
    type: String,
    required: true
  },

  txId: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })

export const EasenftTransactionModel = easenftMongoDbConn.model("transaction", EasenftTransactionSchema)
