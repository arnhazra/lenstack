import mongoose from 'mongoose'
import statusMessages from '../constants/statusMessages'
import { envConfig } from '../../config/envConfig'

const dbConnect = async () => {
    mongoose.connect(envConfig.mongoUri)

    mongoose.connection.on('connected', () => {
        console.log(statusMessages.mongoDbConnected)
    })

    mongoose.connection.on('error', (err) => {
        console.log(statusMessages.mongoDbConnectionErr)
    })
}

export default dbConnect