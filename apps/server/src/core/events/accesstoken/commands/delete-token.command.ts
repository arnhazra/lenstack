import Redis from "ioredis"
import { envConfig } from "src/env.config"

export default async function deleteTokenCommand(userId: string) {
  const redis = new Redis({
    port: Number(envConfig.redisPort),
    host: envConfig.redisSocketHost,
    password: envConfig.redisPassword,
  })

  const response = await redis.del(userId)
  return response
}