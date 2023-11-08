import mongoose from "mongoose"
import { lenstackPlatformMongoDbConn } from "../../../utils/dbConnect"

const SubscriptionSchema = new mongoose.Schema({
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workspace",
    required: true,
    unique: true
  },

  selectedPlan: {
    type: String,
    required: true
  },

  apiKey: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  remainingCredits: {
    type: Number,
    required: true
  },

  expiresAt: {
    type: Date,
    default: function () {
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)
      return expirationDate
    }
  }
}, { versionKey: false })

export const SubscriptionModel = lenstackPlatformMongoDbConn.model("subscription", SubscriptionSchema)
