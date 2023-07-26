import mongoose from "mongoose"
import { frostlakeDb } from "../../../utils/dbConnect"

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

    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const FrostlakeProjectModel = frostlakeDb.model("frostlakeproject", FrostlakeProjectSchema)

export default FrostlakeProjectModel