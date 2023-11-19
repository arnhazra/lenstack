import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/db-connect"

const ApiReferenceSchema = new mongoose.Schema({
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

export const ApiReferenceModel = lenstackPlatformMongoDbConn.model("apireference", ApiReferenceSchema)
