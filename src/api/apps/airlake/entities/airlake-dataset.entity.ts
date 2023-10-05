import mongoose from "mongoose"
import { masterDb } from "../../../../utils/dbConnect"

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


export const AirlakeDatasetDataModel = masterDb.model("airlakedatasetsdata", AirlakeDatasetDataSchema)