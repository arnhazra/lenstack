import { datamarketplaceDatabaseConn } from "src/lib/connect-databases"
import { MetadataSchema } from "../schemas/metadata.schema"

export const MetaDataModel = datamarketplaceDatabaseConn.model("metadata", MetadataSchema)