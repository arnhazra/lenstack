import { Schema } from "mongoose"

export const BlockchainSchema = new Schema({
  rpcProviderName: {
    type: String,
    required: true
  },

  rpcProviderUri: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })