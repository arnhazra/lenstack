import { platformDatabaseConn } from "src/lib/connect-databases"
import { OrganizationSchema } from "../schemas/organization.schema"

export const OrganizationModel = platformDatabaseConn.model("organization", OrganizationSchema)