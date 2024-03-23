import { nftstudioDatabaseConn } from "../../../../../lib/connect-databases"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = nftstudioDatabaseConn.model("transaction", TransactionSchema)