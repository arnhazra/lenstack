import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { envConfig } from './config/envConfig'
import { dbConnect } from './src/utils/dbConnect'
import { connectRedis } from './src/utils/redisHelper'
import UserRouter from './src/routes/UserRouter'
import TransactionRouter from './src/routes/TransactionRouter'
import AirlakeRouter from './src/routes/AirlakeRouter'
import EvolakeRouter from './src/routes/EvolakeRouter'
import IcelakeRouter from './src/routes/IcelakeRouter'
import CommonRouter from './src/routes/CommonRouter'

const userRouter = new UserRouter()
const transactionRouter = new TransactionRouter()
const airlakeRouter = new AirlakeRouter()
const evolakeRouter = new EvolakeRouter()
const icelakeRouter = new IcelakeRouter()
const commonRouter = new CommonRouter()

const app = express()
app.listen(envConfig.apiPort)
app.use(cors())
app.use(express.json({ limit: '3mb' }))
dbConnect()
connectRedis()

app.use('/api/user', userRouter.getRouter())
app.use('/api/transaction', transactionRouter.getRouter())
app.use('/api/common', commonRouter.getRouter())
app.use('/api/products/airlake', airlakeRouter.getRouter())
app.use('/api/products/evolake', evolakeRouter.getRouter())
app.use('/api/products/icelake', icelakeRouter.getRouter())

if (envConfig.nodeEnv === 'production') {
    const cacheControl = 'public, max-age=31536000'
    function setCustomCacheControl(res: Response, path: string) {
        if (express.static.mime.lookup(path) === 'text/html') {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        } else {
            res.setHeader('Cache-Control', cacheControl)
        }
    }

    app.use(express.static(path.join(__dirname, 'client'), { maxAge: 60000, setHeaders: setCustomCacheControl }))
    app.get('/*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client', `${req.originalUrl.split('?')[0]}.html`))
    })
}
