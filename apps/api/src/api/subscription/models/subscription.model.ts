import { platformDatabaseConn } from "../../../lib/connect-databases"
import { SubscriptionSchema } from "../schemas/subscription.schema"

export const SubscriptionModel = platformDatabaseConn.model("subscription", SubscriptionSchema)
