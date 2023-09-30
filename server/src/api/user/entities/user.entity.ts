import mongoose from "mongoose"
import { masterDb, replicaDb } from "../../../utils/dbConnect"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

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

    privateKey: {
        type: String,
        required: true
    },

    trialAvailable: {
        type: Boolean,
        default: true
    },

    paymentStatus: {
        type: Number,
        default: false
    }
}, { versionKey: false })

const MasterUserModel = masterDb.model("user", UserSchema)
const ReplicaUserModel = replicaDb.model("user", UserSchema)

export { MasterUserModel, ReplicaUserModel }