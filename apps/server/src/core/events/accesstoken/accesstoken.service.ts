import { BadRequestException, Injectable } from "@nestjs/common"
import Redis from "ioredis"
import { SetAccessTokenDto } from "./dto/set-accesstoken.dto"
import { GetAccessTokenDto } from "./dto/get-accesstoken.dto"
import { DeleteAccessTokenDto } from "./dto/delete-accesstoken.dto"
import { envConfig } from "src/env.config"

@Injectable()
export class AccesstokenService {
  private readonly redis: Redis

  constructor() {
    this.redis = new Redis({
      port: Number(envConfig.redisPort),
      host: envConfig.redisSocketHost,
      password: envConfig.redisPassword,
    })
  }

  async setToken(setAccessTokenDto: SetAccessTokenDto) {
    try {
      const { userId, accessToken } = setAccessTokenDto
      const response = await this.redis.set(userId, accessToken)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getToken(getAccessTokenDto: GetAccessTokenDto) {
    try {
      const { userId } = getAccessTokenDto
      const response = await this.redis.get(userId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async deleteToken(deleteAccessTokenDto: DeleteAccessTokenDto) {
    try {
      const { userId } = deleteAccessTokenDto
      const response = await this.redis.del(userId)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
