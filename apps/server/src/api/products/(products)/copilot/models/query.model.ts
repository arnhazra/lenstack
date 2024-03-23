import { copilotDatabaseConn } from "src/lib/connect-databases"
import { QuerySchema } from "../schemas/query.schema"

export const QueryModel = copilotDatabaseConn.model("query", QuerySchema)