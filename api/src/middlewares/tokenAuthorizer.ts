import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { statusMessages } from "../constants/statusMessages"
import { getTokenFromRedis } from "../utils/redisHelper"
import { envConfig } from "../../config/envConfig"

const authPublicKey = envConfig.authPublicKey

async function tokenAuthorizer(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers["authorization"]?.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({ msg: statusMessages.unauthorized })
    }

    else {
        try {
            const decoded = jwt.verify(accessToken, authPublicKey, { algorithms: ["RS512"] })
            req.headers.id = (decoded as any).id
            const redisAccessToken = await getTokenFromRedis(req.headers.id as string)

            if (redisAccessToken === accessToken) {
                next()
            }

            else {
                return res.status(401).json({ msg: statusMessages.invalidToken })
            }
        }

        catch (error) {
            return res.status(401).json({ msg: statusMessages.invalidToken })
        }
    }
}

export { tokenAuthorizer }