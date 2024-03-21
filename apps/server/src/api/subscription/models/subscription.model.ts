import { platformDatabaseConn } from "../../../lib/db-connect"
import { SubscriptionSchema } from "../schemas/subscription.schema"

export const SubscriptionModel = platformDatabaseConn.model("subscription", SubscriptionSchema)
