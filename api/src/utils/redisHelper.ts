import Redis from 'ioredis'
import { statusMessages } from '../constants/statusMessages'
import { envConfig } from '../../config/envConfig'

const redis = new Redis({
    port: Number(envConfig.redisPort),
    host: envConfig.redisSocketHost,
    password: envConfig.redisPassword,
})

const setTokenInRedis = async (userId: string, accessToken: string) => {
    const response = await redis.set(userId, accessToken)
    return response
}

const getTokenFromRedis = async (userId: string) => {
    const response = await redis.get(userId)
    return response
}

const removeTokenFromRedis = async (userId: string) => {
    const response = await redis.del(userId)
    return response
}

export { getTokenFromRedis, removeTokenFromRedis, setTokenInRedis }