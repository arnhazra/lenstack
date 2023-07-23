import mongoose from 'mongoose'
import { frostlakeDb } from '../../../utils/dbConnect'

const FrostlakeAnalyticsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frostlakeproject',
        required: true
    },

    component: {
        type: String,
        required: true
    },

    event: {
        type: String,
        required: true
    },

    info: {
        type: String,
        required: true
    },

    statusCode: {
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
    }
}, { versionKey: false })

const FrostlakeAnalyticsModel = frostlakeDb.model('frostlakeanalytics', FrostlakeAnalyticsSchema)

export default FrostlakeAnalyticsModel