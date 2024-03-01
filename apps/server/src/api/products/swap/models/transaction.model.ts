import { swapMongoDbConn } from "../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = swapMongoDbConn.model("transaction", TransactionSchema)