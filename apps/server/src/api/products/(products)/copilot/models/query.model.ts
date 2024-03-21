import { copilotDatabaseConn } from "src/lib/db-connect"
import { QuerySchema } from "../schemas/query.schema"

export const QueryModel = copilotDatabaseConn.model("query", QuerySchema)