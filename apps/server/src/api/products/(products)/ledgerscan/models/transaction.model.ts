import { ledgerscanMongoDbConn } from "../../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = ledgerscanMongoDbConn.model("transaction", TransactionSchema)