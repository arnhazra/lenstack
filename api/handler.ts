import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { envConfig } from './config/envConfig'
import { dbConnect } from './src/utils/dbConnect'
import { connectRedis } from './src/utils/redisHelper'
import UserRouter from './src/routes/UserRouter'
import TransactionRouter from './src/routes/TransactionRouter'
import EvolakeRouter from './src/routes/EvolakeRouter'
import AirlakeRouter from './src/routes/AirlakeRouter'
import IcelakeRouter from './src/routes/IcelakeRouter'

const userRouter = new UserRouter()
const transactionRouter = new TransactionRouter()
const airlakeRouter = new AirlakeRouter()
const evolakeRouter = new EvolakeRouter()
const icelakeRouter = new IcelakeRouter()

const app = express()
app.listen(envConfig.apiPort)
app.use(cors())
app.use(express.json({ limit: '3mb' }))
dbConnect()
connectRedis()

app.use('/api/user', userRouter.getRouter())
app.use('/api/transaction', transactionRouter.getRouter())
app.use('/api/airlake', airlakeRouter.getRouter())
app.use('/api/evolake', evolakeRouter.getRouter())
app.use('/api/icelake', icelakeRouter.getRouter())

if (envConfig.nodeEnv === 'production') {
    const cacheControl = 'public, max-age=31536000'
    function setCustomCacheControl(res, path) {
        if (express.static.mime.lookup(path) === 'text/html') {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        } else {
            res.setHeader('Cache-Control', cacheControl)
        }
    }

    app.use(express.static(path.join(__dirname, 'views'), { maxAge: '1y', setHeaders: setCustomCacheControl }))
    app.use('/*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'views', `${req.originalUrl.split('?')[0]}.html`))
    })
}
