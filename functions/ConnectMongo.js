const mongoose = require('mongoose')
const statusMessages = require('../constants/Messages')
const dotenv = require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI

const connectMongo = async () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.connection.on('connected', () => {
        console.log(statusMessages.mongoDbConnected)
    })

    mongoose.connection.on('error', (err) => {
        console.log(statusMessages.mongoDbConnectionErr, err)
    })
}

module.exports = connectMongo