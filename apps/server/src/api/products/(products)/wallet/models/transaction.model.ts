import { walletDatabaseConn } from "src/lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = walletDatabaseConn.model("transaction", TransactionSchema)