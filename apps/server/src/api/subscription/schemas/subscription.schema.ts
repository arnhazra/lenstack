import { Schema } from "mongoose"
import { platformDatabaseConn } from "src/lib/connect-databases"

export const SubscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true
  },

  selectedPlan: {
    type: String,
    required: true
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

export const SubscriptionModel = platformDatabaseConn.model("subscription", SubscriptionSchema)