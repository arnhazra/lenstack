import { nftstudioMongoDbConn } from "../../../../lib/db-connect"
import { TransactionSchema } from "../schemas/transaction.schema"

export const TransactionModel = nftstudioMongoDbConn.model("transaction", TransactionSchema)