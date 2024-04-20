import { walletDatabaseConn } from "src/lib/connect-databases"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = walletDatabaseConn.model("transaction", TransactionSchema)