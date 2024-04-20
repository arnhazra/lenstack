import { dataexchangeDatabaseConn } from "src/lib/connect-databases"
import { MetadataSchema } from "../schemas/metadata.schema"

export const MetaDataModel = dataexchangeDatabaseConn.model("metadata", MetadataSchema)