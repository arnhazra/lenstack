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

    createdAt: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        default: 'user'
    },

    privateKey: {
        type: String,
        required: true
    }
}, { versionKey: false })

const UserModel = mongoose.model('user', UserSchema)

export default UserModel