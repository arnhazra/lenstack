import mongoose from 'mongoose'

const EvolakeSchema = new mongoose.Schema({
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

const EvolakeModel = mongoose.model('evolake', EvolakeSchema)

export default EvolakeModel