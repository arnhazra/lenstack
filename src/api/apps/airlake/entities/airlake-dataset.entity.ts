import mongoose from "mongoose"
import { mongoDbConn } from "../../../../utils/dbConnect"

const AirlakeDatasetDataSchema = new mongoose.Schema({
  datasetRelationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "airlakedatasetsmetadata",
    required: true
  },

  data: {
    type: Object,
    required: true
  }
}, { versionKey: false })


export const AirlakeDatasetDataModel = mongoDbConn.model("airlakedatasetsdata", AirlakeDatasetDataSchema)