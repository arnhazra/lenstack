import { Schema } from "mongoose"
import { datamarketplaceDatabaseConn } from "src/lib/connect-databases"

export const MetadataSchema = new Schema({
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

export const MetaDataModel = datamarketplaceDatabaseConn.model("metadata", MetadataSchema)