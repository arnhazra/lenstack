const express = require('express')
const connectMongo = require('./functions/ConnectMongo')
const cors = require('cors')
const dotenv = require('dotenv').config()
const path = require('path')
const SubscriptionRouter = require('./routes/SubscriptionRouter')
const DatasetRouter = require('./routes/DatasetRouter')
const WalletRouter = require('./routes/WalletRouter')
const AuthRouter = require('./routes/AuthRouter')
const { connectRedis } = require('./functions/UseRedis')

const subscriptionRouter = new SubscriptionRouter()
const datasetRouter = new DatasetRouter()
const walletRouter = new WalletRouter()
const authRouter = new AuthRouter()
const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.json({ extended: false, limit: '5mb' }))
connectMongo()
connectRedis()

app.use('/api/subscription', subscriptionRouter.getRouter())
app.use('/api/dataset', datasetRouter.getRouter())
app.use('/api/wallet', walletRouter.getRouter())
app.use('/api/auth', authRouter.getRouter())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'view', 'out')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'view', 'out', 'index.html'))
    })
}
