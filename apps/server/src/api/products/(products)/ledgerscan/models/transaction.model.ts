import { ledgerscanDatabaseConn } from "../../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = ledgerscanDatabaseConn.model("transaction", TransactionSchema)