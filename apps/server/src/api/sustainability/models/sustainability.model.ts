import { platformMongoDbConn } from "src/lib/db-connect"
import { SustainabilitySettingsSchema } from "../schemas/sustainability.schema"

export const SustainabilityModel = platformMongoDbConn.model("sustainability-settings", SustainabilitySettingsSchema)