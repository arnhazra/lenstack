import mongoose from "mongoose"
import { masterDb } from "../../../../utils/dbConnect"

const AirlakeHistorySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  datasetId: {
    type: String,
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

const MasterAirlakeHistoryModel = masterDb.model("airlakehistory", AirlakeHistorySchema)

export { MasterAirlakeHistoryModel }