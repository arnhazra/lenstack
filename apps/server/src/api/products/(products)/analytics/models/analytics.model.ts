import { analyticsDatabaseConn } from "src/lib/connect-databases"
import { AnalyticsSchema } from "../schemas/analytics.schema"

export const AnalyticsModel = analyticsDatabaseConn.model("analytics", AnalyticsSchema)