import { dataexchangeDatabaseConn } from "src/lib/db-connect"
import { MetadataSchema } from "../schemas/metadata.schema"

export const MetaDataModel = dataexchangeDatabaseConn.model("metadata", MetadataSchema)