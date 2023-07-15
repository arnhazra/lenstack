import mongoose from 'mongoose'
import { airlakeDb } from '../utils/dbConnect'

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

const AirlakeDatasetModel = airlakeDb.model('airlakedataset', AirlakeDatasetSchema)

export default AirlakeDatasetModel