import mongoose from 'mongoose'

const AirlakeDatasetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    data: {
        type: Object,
        required: true
    },

    rating: {
        type: Number,
        required: true
    }
}, { versionKey: false })

const AirlakeDatasetModel = mongoose.model('airlake-dataset', AirlakeDatasetSchema)

export default AirlakeDatasetModel