import { blockchainDatabaseConn } from "src/lib/connect-databases"
import { BlockchainSchema } from "../schemas/blockchain.schema"

export const BlockchainModel = blockchainDatabaseConn.model("rpcnodes", BlockchainSchema)