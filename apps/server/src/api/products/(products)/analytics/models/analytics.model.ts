import { analyticsMongoDbConn } from "src/lib/db-connect"
import { AnalyticsSchema } from "../schemas/analytics.schema"

export const AnalyticsModel = analyticsMongoDbConn.model("analytics", AnalyticsSchema)