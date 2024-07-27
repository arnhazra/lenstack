import { Schema } from "mongoose"

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  role: {
    type: String,
    default: "user"
  },

  reduceCarbonEmissions: {
    type: Boolean,
    default: true
  },

  selectedOrgId: {
    type: Schema.Types.ObjectId,
    ref: "organization"
  }
}, { versionKey: false })
