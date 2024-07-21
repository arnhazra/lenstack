import { Schema } from "mongoose"

export const BlockchainSchema = new Schema({
  rpcProviderName: {
    type: String,
    required: true
  },

  rpcGateway: {
    type: String,
    required: true
  },

  rpcChain: {
    type: String,
    required: true
  },

  rpcNetwork: {
    type: String,
    required: true
  },

  rpcProviderUri: {
    type: String,
    required: true
  }
}, { versionKey: false })