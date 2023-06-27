import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        default: 'consumer'
    },

    privateKey: {
        type: String,
        required: true
    },

    subscriptionKey: {
        type: String,
        default: ""
    }
}, { versionKey: false })

const UserModel = mongoose.model('user', UserSchema)

export default UserModel