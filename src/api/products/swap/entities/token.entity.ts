import mongoose from "mongoose"
import { swapMongoDbConn } from "../../../../utils/db-connect"

const TokenSchema = new mongoose.Schema({
  tokenName: {
    type: String,
    required: true
  },

  tokenSymbol: {
    type: String,
    required: true
  },

  tokenContractAddress: {
    type: String,
    required: true
  },

  vendorContractAddress: {
    type: String,
    required: true
  },

  tokensPerMatic: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },
}, { versionKey: false })

export const TokenModel = swapMongoDbConn.model("token", TokenSchema)