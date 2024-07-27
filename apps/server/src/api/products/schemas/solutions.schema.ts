import { Schema } from "mongoose"
import { platformDatabaseConn } from "src/lib/connect-databases"

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

export const SolutionModel = platformDatabaseConn.model("solution", SolutionSchema)