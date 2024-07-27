import { Schema } from "mongoose"
import { datamarketplaceDatabaseConn } from "src/utils/connect-databases"

export const DatasetSchema = new Schema({
  datasetRelationId: {
    type: Schema.Types.ObjectId,
    ref: "datasetmetadata",
    required: true
  },

  data: {
    type: Object,
    required: true
  }
}, { versionKey: false })

export const DatasetModel = datamarketplaceDatabaseConn.model("dataset", DatasetSchema)