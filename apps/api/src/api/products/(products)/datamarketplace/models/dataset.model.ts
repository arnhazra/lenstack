import { datamarketplaceDatabaseConn } from "src/lib/connect-databases"
import { DatasetSchema } from "../schemas/dataset.schema"

export const DatasetModel = datamarketplaceDatabaseConn.model("dataset", DatasetSchema)