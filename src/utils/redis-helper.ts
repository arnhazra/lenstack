import Redis from "ioredis"
import { envConfig } from "../env.config"

const redis: Redis = new Redis({
  port: Number(envConfig.redisPort),
  host: envConfig.redisSocketHost,
  password: envConfig.redisPassword,
})

export async function setTokenInRedis(userId: string, accessToken: string): Promise<"OK"> {
  const response = await redis.set(userId, accessToken)
  return response
}

export async function getTokenFromRedis(userId: string): Promise<string> {
  const response = await redis.get(userId)
  return response
}

export async function removeTokenFromRedis(userId: string): Promise<number> {
  const response = await redis.del(userId)
  return response
}