import { walletMongoDbConn } from "src/lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = walletMongoDbConn.model("transaction", TransactionSchema)