import { dataexchangeDatabaseConn } from "src/lib/db-connect"
import { DatasetSchema } from "../schemas/dataset.schema"

export const DatasetModel = dataexchangeDatabaseConn.model("dataset", DatasetSchema)