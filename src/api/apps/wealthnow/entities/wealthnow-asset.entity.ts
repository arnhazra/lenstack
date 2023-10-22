import mongoose from "mongoose"
import { wealthnowMongoDbConn } from "../../../../utils/dbConnect"

const WealthnowAssetSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "portfolio",
    required: true
  },

  principalAmount: {
    type: Number,
    required: true
  },

  rateOfInterest: {
    type: Number,
  },

  tenure: {
    type: Number,
  },

  maturityAmount: {
    type: Number,
  },

  apiKey: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const WealthnowAssetModel = wealthnowMongoDbConn.model("asset", WealthnowAssetSchema)