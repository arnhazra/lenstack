import mongoose from 'mongoose'
import { mainLenstackDb } from '../../utils/dbConnect'

const SubscriptionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },

    selectedPlan: {
        type: String,
        required: true
    },

    apiKey: {
        type: String,
        required: true,
    },

    tokenId: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAt: {
        type: Date,
        default: function () {
            const expirationDate = new Date()
            expirationDate.setDate(expirationDate.getDate() + 30)
            return expirationDate
        }
    }
}, { versionKey: false })

const SubscriptionModel = mainLenstackDb.model('subscription', SubscriptionSchema)

export default SubscriptionModel