import { copilotMongoDbConn } from "src/utils/db-connect"
import { QuerySchema } from "../schemas/query.schema"

export const QueryModel = copilotMongoDbConn.model("query", QuerySchema)