import { Schema } from "mongoose"

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