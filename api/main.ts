import express, { Request, Response } from 'express'
import cors from 'cors'
import { envConfig } from './config/envConfig'
import { dbConnect } from './src/utils/dbConnect'
import { connectRedis } from './src/utils/redisHelper'
import UserRouter from './src/app/user/UserRouter'
import TransactionRouter from './src/app/transaction/TransactionRouter'
import AirlakeRouter from './src/app/products/airlake/AirlakeRouter'
import EvolakeRouter from './src/app/products/evolake/EvolakeRouter'
import IcelakeRouter from './src/app/products/icelake/IcelakeRouter'
import CommonRouter from './src/app/common/CommonRouter'
import FrostlakeRouter from './src/app/products/frostlake/FrostlakeRouter'

export const bootstrap = () => {
    const app = express()
    app.listen(envConfig.apiPort)
    app.use(cors())
    app.use(express.json({ limit: '3mb' }))
    dbConnect()
    connectRedis()

    const userRouter = new UserRouter()
    const transactionRouter = new TransactionRouter()
    const airlakeRouter = new AirlakeRouter()
    const evolakeRouter = new EvolakeRouter()
    const icelakeRouter = new IcelakeRouter()
    const frostlakeRouter = new FrostlakeRouter()
    const commonRouter = new CommonRouter()

    app.use('/api/user', userRouter.getRouter())
    app.use('/api/transaction', transactionRouter.getRouter())
    app.use('/api/common', commonRouter.getRouter())
    app.use('/api/products/airlake', airlakeRouter.getRouter())
    app.use('/api/products/evolake', evolakeRouter.getRouter())
    app.use('/api/products/icelake', icelakeRouter.getRouter())
    app.use('/api/products/frostlake', frostlakeRouter.getRouter())
}

bootstrap()