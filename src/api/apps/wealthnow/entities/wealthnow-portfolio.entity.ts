import mongoose from "mongoose"
import { wealthnowMongoDbConn } from "../../../../utils/dbConnect"

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

export const WealthnowPortfolioModel = wealthnowMongoDbConn.model("portfolio", WealthnowPortfolioSchema)