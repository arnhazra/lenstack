import { Schema } from "mongoose"

export const SustainabilitySettingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  useLessEnergy: {
    type: Boolean,
    required: true,
    default: false
  },

  useOptimizedAPICalls: {
    type: Boolean,
    required: true,
    default: true
  },

  useDarkMode: {
    type: Boolean,
    required: true,
    default: false
  },

  useFastestNode: {
    type: Boolean,
    required: true,
    default: true
  }
}, { versionKey: false })