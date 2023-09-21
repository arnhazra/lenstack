import mongoose from "mongoose"
import { airlakeDb } from "../../../utils/dbConnect"

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

const AirlakeDatasetDataModel = airlakeDb.model("airlakedatasetsdata", AirlakeDatasetDataSchema)

export default AirlakeDatasetDataModel