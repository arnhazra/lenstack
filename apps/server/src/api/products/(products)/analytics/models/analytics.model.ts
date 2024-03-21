import { analyticsDatabaseConn } from "src/lib/db-connect"
import { AnalyticsSchema } from "../schemas/analytics.schema"

export const AnalyticsModel = analyticsDatabaseConn.model("analytics", AnalyticsSchema)