import { platformDatabaseConn } from "src/lib/connect-databases"
import { ApiReferenceSchema } from "../schemas/apireference.schema"

export const ApiReferenceModel = platformDatabaseConn.model("apireference", ApiReferenceSchema)