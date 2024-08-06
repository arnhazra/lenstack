import Redis from "ioredis"
import { envConfig } from "src/env.config"

export default async function getTokenQuery(userId: string) {
  const redis = new Redis({
    port: Number(envConfig.redisPort),
    host: envConfig.redisSocketHost,
    password: envConfig.redisPassword,
  })

  const response = await redis.get(userId)
  redis.disconnect()
  return response
}