import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../../utils/dbConnect"

const WealthnowPortfolioSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  name: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const MasterWealthnowPortfolioModel = masterDb.model("wealthnowportfolio", WealthnowPortfolioSchema)
export const ReplicaWealthnowPortfolioModel = replicaDb.model("wealthnowportfolio", WealthnowPortfolioSchema)