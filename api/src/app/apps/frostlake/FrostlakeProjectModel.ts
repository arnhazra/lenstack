import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../utils/dbConnect"

const FrostlakeProjectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    name: {
        type: String,
        required: true
    },

    clientId: {
        type: String,
        required: true,
        unique: true,
    },

    clientSecret: {
        type: String,
        required: true,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

export const MasterFrostlakeProjectModel = masterDb.model("frostlakeproject", FrostlakeProjectSchema)
export const ReplicaFrostlakeProjectModel = replicaDb.model("frostlakeproject", FrostlakeProjectSchema)