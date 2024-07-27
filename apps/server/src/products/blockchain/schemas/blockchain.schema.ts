import { Schema } from "mongoose"
import { blockchainDatabaseConn } from "src/utils/connect-databases"

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

export const BlockchainModel = blockchainDatabaseConn.model("rpcnodes", BlockchainSchema)