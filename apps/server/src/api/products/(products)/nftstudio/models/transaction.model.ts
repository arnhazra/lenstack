import { nftstudioDatabaseConn } from "../../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = nftstudioDatabaseConn.model("transaction", TransactionSchema)