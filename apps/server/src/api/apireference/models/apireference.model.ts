import { platformDatabaseConn } from "src/lib/db-connect"
import { ApiReferenceSchema } from "../schemas/apireference.schema"

export const ApiReferenceModel = platformDatabaseConn.model("apireference", ApiReferenceSchema)