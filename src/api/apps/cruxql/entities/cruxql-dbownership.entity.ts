import mongoose from "mongoose"
import { mongoDbConn } from "../../../../utils/dbConnect"

const CruxqlDbOwnershipSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  dbRelationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cruxqldblist",
    required: true
  },

  apiKey: {
    type: String,
    required: true
  },
}, { versionKey: false })

export const CruxqlDbOwnershipModel = mongoDbConn.model("cruxqldbownership", CruxqlDbOwnershipSchema)