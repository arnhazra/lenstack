import { Schema } from "mongoose"

export const SolutionSchema = new Schema({
  solutionName: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  solutionIcon: {
    type: String,
    required: true
  }
}, { versionKey: false })

