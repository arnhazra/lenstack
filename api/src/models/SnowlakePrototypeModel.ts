import mongoose from 'mongoose'

const SnowlakePrototypeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    apiKey: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const SnowlakePrototypeModel = mongoose.model('snowlake-prototype', SnowlakePrototypeSchema)

export default SnowlakePrototypeModel