import Redis from "ioredis"
import { envConfig } from "../config/env.config"

const redis = new Redis({
  port: Number(envConfig.redisPort),
  host: envConfig.redisSocketHost,
  password: envConfig.redisPassword,
})

export const setTokenInRedis = async (userId: string, accessToken: string) => {
  const response = await redis.set(userId, accessToken)
  return response
}

export const getTokenFromRedis = async (userId: string) => {
  const response = await redis.get(userId)
  return response
}

export const removeTokenFromRedis = async (userId: string) => {
  const response = await redis.del(userId)
  return response
}