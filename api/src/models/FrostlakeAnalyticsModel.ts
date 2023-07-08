import mongoose from 'mongoose'

const FrostlakeAnalyticsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    project: {
        type: String,
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

const FrostlakeAnalyticsModel = mongoose.model('frostlakeanalytics', FrostlakeAnalyticsSchema)

export default FrostlakeAnalyticsModel