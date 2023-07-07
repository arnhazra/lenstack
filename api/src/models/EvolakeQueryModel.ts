import mongoose from 'mongoose'

const EvolakeQuerySchema = new mongoose.Schema({
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

    apiKey: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}, { versionKey: false })

const EvolakeQueryModel = mongoose.model('evolakequery', EvolakeQuerySchema)

export default EvolakeQueryModel