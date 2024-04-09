import { dataexchangeDatabaseConn } from "src/lib/connect-databases"
import { DatasetSchema } from "../schemas/dataset.schema"

export const DatasetModel = dataexchangeDatabaseConn.model("dataset", DatasetSchema)