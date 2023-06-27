import mongoose from 'mongoose'

const AirlakeHistorySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    datasetId: {
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

const AirlakeHistoryModel = mongoose.model('airlake-history', AirlakeHistorySchema)

export default AirlakeHistoryModel