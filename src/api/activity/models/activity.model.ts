import { platformMongoDbConn } from "src/utils/db-connect"
import { ActivitySchema } from "../schemas/activity.schema"

export const ActivityModel = platformMongoDbConn.model("activity", ActivitySchema)