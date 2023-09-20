import express, { Request, Response } from "express"
import cors from "cors"
import path from "path"
import { envConfig } from "./config/envConfig"
import { dbConnect } from "./src/utils/dbConnect"
import UserRouter from "./src/app/user/UserRouter"
import TransactionRouter from "./src/app/transaction/TransactionRouter"
import AirlakeRouter from "./src/app/apps/airlake/AirlakeRouter"
import EvolakeRouter from "./src/app/apps/evolake/EvolakeRouter"
import IcelakeRouter from "./src/app/apps/icelake/IcelakeRouter"
import FrostlakeRouter from "./src/app/apps/frostlake/FrostlakeRouter"
import WealthnowRouter from "./src/app/apps/wealthnow/WealthnowRouter"
import CommonRouter from "./src/app/common/CommonRouter"
import SubscriptionRouter from "./src/app/subscription/SubscriptionRouter"

const userRouter = new UserRouter()
const transactionRouter = new TransactionRouter()
const airlakeRouter = new AirlakeRouter()
const evolakeRouter = new EvolakeRouter()
const icelakeRouter = new IcelakeRouter()
const wealthNowRouter = new WealthnowRouter()
const frostlakeRouter = new FrostlakeRouter()
const commonRouter = new CommonRouter()
const subscriptionRouter = new SubscriptionRouter()

const app = express()
app.listen(envConfig.apiPort)
app.use(cors())
app.use(express.json({ limit: "3mb" }))
dbConnect()

app.use("/api/user", userRouter.getRouter())
app.use("/api/transaction", transactionRouter.getRouter())
app.use("/api/common", commonRouter.getRouter())
app.use("/api/subscription", subscriptionRouter.getRouter())
app.use("/api/apps/airlake", airlakeRouter.getRouter())
app.use("/api/apps/evolake", evolakeRouter.getRouter())
app.use("/api/apps/icelake", icelakeRouter.getRouter())
app.use("/api/apps/frostlake", frostlakeRouter.getRouter())
app.use("/api/apps/wealthnow", wealthNowRouter.getRouter())


if (envConfig.nodeEnv === "production") {
    const cacheControl = "public, max-age=31536000"
    function setCustomCacheControl(res: Response, path: string) {
        if (express.static.mime.lookup(path) === "text/html") {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
        } else {
            res.setHeader("Cache-Control", cacheControl)
        }
    }

    app.use(express.static(path.join(__dirname, "client"), { maxAge: 60000, setHeaders: setCustomCacheControl }))
    app.get("/*", (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "client", `${req.originalUrl.split("?")[0]}.html`))
    })
}
