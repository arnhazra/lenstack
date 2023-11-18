import mongoose from "mongoose"
import { datalakeMongoDbConn } from "../../../../utils/dbConnect"

const DatalakeDatasetMetadataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true
  }
}, { versionKey: false })

export const DatalakeDatasetMetaDataModel = datalakeMongoDbConn.model("datasetmetadata", DatalakeDatasetMetadataSchema)