import mongoose from "mongoose"
import { snowlakeMongoDbConn } from "../../../../utils/dbConnect"

const SnowlakeTransactionSchema = new mongoose.Schema({
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

export const SnowlakeTransactionModel = snowlakeMongoDbConn.model("transaction", SnowlakeTransactionSchema)
