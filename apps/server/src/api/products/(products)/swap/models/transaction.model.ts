import { swapDatabaseConn } from "../../../../../lib/connect-databases"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = swapDatabaseConn.model("transaction", TransactionSchema)