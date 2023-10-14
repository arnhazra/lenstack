import mongoose from "mongoose"
import { mongoDbConn } from "../../../../utils/dbConnect"

const SnowlakeTransactionSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  apiKey: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false })

export const SnowlakeTransactionModel = mongoDbConn.model("snowlaketransaction", SnowlakeTransactionSchema)
