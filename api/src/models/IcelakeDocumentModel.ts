import mongoose from 'mongoose'

const IcelakeDocumentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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

    date: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const IcelakeDocumentModel = mongoose.model('icelake-document', IcelakeDocumentSchema)

export default IcelakeDocumentModel