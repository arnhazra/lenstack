import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    query: {
        type: String,
        required: true
    },

    response: {
        type: String,
        required: true
    },

    subscriptionKey: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false })

const AnalyticsModel = mongoose.model('analytics', AnalyticsSchema)

export default AnalyticsModel