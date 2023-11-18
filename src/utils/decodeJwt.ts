import * as jwt from "jsonwebtoken"
import { envConfig } from "src/config/env.config"

export function decodeJwt(accessToken: string) {
  try {
    const decoded = jwt.verify(accessToken, envConfig.authPublicKey, { algorithms: ["RS512"] })
    const userId = (decoded as any).id
    return userId
  }

  catch (error) {
    throw new error
  }
}