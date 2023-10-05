import mongoose from "mongoose"
import { masterDb } from "../../../../utils/dbConnect"

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

export const WealthnowPortfolioModel = masterDb.model("wealthnowportfolio", WealthnowPortfolioSchema)