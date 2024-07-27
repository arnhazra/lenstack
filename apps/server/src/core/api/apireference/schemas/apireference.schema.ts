import { Schema } from "mongoose"
import { platformDatabaseConn } from "src/utils/connect-databases"

export const ApiReferenceSchema = new Schema({
  productName: {
    type: String,
    required: true
  },

  apiName: {
    type: String,
    required: true
  },

  apiUri: {
    type: String,
    required: true
  },

  apiMethod: {
    type: String,
    required: true
  },

  sampleRequestBody: {
    type: Object,
    required: true
  },

  sampleResponseBody: {
    type: Object,
    required: true
  },
}, { versionKey: false })

export const ApiReferenceModel = platformDatabaseConn.model("apireference", ApiReferenceSchema)