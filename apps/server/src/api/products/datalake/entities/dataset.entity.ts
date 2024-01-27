import mongoose from "mongoose"
import { datalakeMongoDbConn } from "../../../../utils/db-connect"

const DatasetSchema = new mongoose.Schema({
  datasetRelationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "datasetmetadata",
    required: true
  },

  data: {
    type: Object,
    required: true
  }
}, { versionKey: false })


export const DatasetModel = datalakeMongoDbConn.model("dataset", DatasetSchema)