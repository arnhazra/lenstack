import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../utils/dbConnect"

const EvolakeQuerySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    query: {
        type: String,
        required: true
    },

    response: {
        type: String,
        required: true
    },

    apiKey: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false })

export const MasterEvolakeQueryModel = masterDb.model("evolakequery", EvolakeQuerySchema)
export const ReplicaEvolakeQueryModel = replicaDb.model("evolakequery", EvolakeQuerySchema)