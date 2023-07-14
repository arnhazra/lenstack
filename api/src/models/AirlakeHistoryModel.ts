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

    apiKey: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false })

const AirlakeHistoryModel = mongoose.model('airlakehistory', AirlakeHistorySchema)

export default AirlakeHistoryModel