import { dataexchangeMongoDbConn } from "src/lib/db-connect"
import { MetadataSchema } from "../schemas/metadata.schema"

export const MetaDataModel = dataexchangeMongoDbConn.model("metadata", MetadataSchema)