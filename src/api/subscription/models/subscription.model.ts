import { platformMongoDbConn } from "../../../utils/db-connect"
import { SubscriptionSchema } from "../schemas/subscription.schema"

export const SubscriptionModel = platformMongoDbConn.model("subscription", SubscriptionSchema)
