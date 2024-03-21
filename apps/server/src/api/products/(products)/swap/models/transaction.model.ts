import { swapDatabaseConn } from "../../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = swapDatabaseConn.model("transaction", TransactionSchema)