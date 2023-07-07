import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    transactionType: {
        type: String,
        required: true
    },

    fromAddress: {
        type: String,
        required: true
    },

    ethAmount: {
        type: String,
        required: true
    },

    txHash: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

const TransactionModel = mongoose.model('transaction', TransactionSchema)

export default TransactionModel