import mongoose from 'mongoose'
import { icelakeDb } from '../../../utils/dbConnect'

const IcelakeDocumentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
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

const IcelakeDocumentModel = icelakeDb.model('icelakedocument', IcelakeDocumentSchema)

export default IcelakeDocumentModel