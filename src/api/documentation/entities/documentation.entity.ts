import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/dbConnect"

const DocumentationSchema = new mongoose.Schema({
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

export const DocumentationModel = lenstackPlatformMongoDbConn.model("documentation", DocumentationSchema)
