import mongoose from "mongoose"
import { platformMongoDbConn } from "../../../utils/db-connect"

const ActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  activityDescription: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

export const ActivityModel = platformMongoDbConn.model("activity", ActivitySchema)
