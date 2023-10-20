import mongoose from "mongoose"
import { cruxqlMongoDbConn } from "../../../../utils/dbConnect"

const CruxqlDbListSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
  },

  cloudPlatform: {
    type: String,
    required: true
  },

  connectionString: {
    type: String,
    required: true
  },

  isSold: {
    type: Boolean,
    default: false
  }
}, { versionKey: false })

export const CruxqlDbListModel = cruxqlMongoDbConn.model("database", CruxqlDbListSchema)