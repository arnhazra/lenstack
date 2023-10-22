import mongoose from "mongoose"
import { cruxqlMongoDbConn } from "../../../../utils/dbConnect"

const CruxqlDbOwnershipSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  dbRelationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "database",
    required: true
  },

  apiKey: {
    type: String,
    required: true
  },
}, { versionKey: false })

export const CruxqlDbOwnershipModel = cruxqlMongoDbConn.model("dbownership", CruxqlDbOwnershipSchema)