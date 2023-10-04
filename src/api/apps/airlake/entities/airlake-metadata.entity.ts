import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../../utils/dbConnect"

const AirlakeDatasetMetadataSchema = new mongoose.Schema({
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

const MasterAirlakeDatasetMetaDataModel = masterDb.model("airlakedatasetsmetadata", AirlakeDatasetMetadataSchema)
const ReplicaAirlakeDatasetMetaDataModel = replicaDb.model("airlakedatasetsmetadata", AirlakeDatasetMetadataSchema)

export { MasterAirlakeDatasetMetaDataModel, ReplicaAirlakeDatasetMetaDataModel }
