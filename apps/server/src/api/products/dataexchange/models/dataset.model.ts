import { dataexchangeMongoDbConn } from "src/lib/db-connect"
import { DatasetSchema } from "../schemas/dataset.schema"

export const DatasetModel = dataexchangeMongoDbConn.model("dataset", DatasetSchema)