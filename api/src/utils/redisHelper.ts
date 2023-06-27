import { createClient } from 'redis'
import { statusMessages } from '../constants/statusMessages'
import { envConfig } from '../../config/envConfig'

const redis = createClient({ url: envConfig.redisUri })

const connectRedis = async () => {
    try {
        await redis.connect()
        console.log(statusMessages.redisConnected)
    } catch (error) {
        console.log(statusMessages.connectionError)
    }
}

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

export { getTokenFromRedis, removeTokenFromRedis, connectRedis, setTokenInRedis }