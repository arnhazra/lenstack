import { Schema } from "mongoose"

export const TokenSchema = new Schema({
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