import mongoose from "mongoose"
import { datalakeMongoDbConn } from "../../../../utils/dbConnect"

const DatalakeDatasetDataSchema = new mongoose.Schema({
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


export const DatalakeDatasetDataModel = datalakeMongoDbConn.model("datasetdata", DatalakeDatasetDataSchema)