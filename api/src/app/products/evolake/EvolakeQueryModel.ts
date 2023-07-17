import mongoose from 'mongoose'
import { evolakeDb } from '../../../utils/dbConnect'

const EvolakeQuerySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
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

const EvolakeQueryModel = evolakeDb.model('evolakequery', EvolakeQuerySchema)

export default EvolakeQueryModel