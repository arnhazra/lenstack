import { platformMongoDbConn } from "src/utils/db-connect"
import { ApiReferenceSchema } from "../schemas/apireference.schema"

export const ApiReferenceModel = platformMongoDbConn.model("apireference", ApiReferenceSchema)