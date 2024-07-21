import { platformDatabaseConn } from "src/lib/connect-databases"
import { InsightsSchema } from "../schemas/insights.schema"

export const InsightsModel = platformDatabaseConn.model("insights", InsightsSchema)