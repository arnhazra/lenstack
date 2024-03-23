import { ledgerscanDatabaseConn } from "../../../../../lib/connect-databases"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = ledgerscanDatabaseConn.model("transaction", TransactionSchema)