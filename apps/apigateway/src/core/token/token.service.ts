import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { SetTokenDto } from "./dto/set-token.dto"
import { GetTokenDto } from "./dto/get-token.dto"
import { DeleteTokenDto } from "./dto/delete-token.dto"
import Redis from "ioredis"

@Injectable()
export class TokenService {
  constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

  async setToken(setTokenDto: SetTokenDto) {
    try {
      const { userId, token } = setTokenDto
      return await this.redisClient.set(userId, token)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async getToken(getTokenDto: GetTokenDto) {
    try {
      const { userId } = getTokenDto
      return await this.redisClient.get(userId)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async deleteToken(deleteTokenDto: DeleteTokenDto) {
    try {
      const { userId } = deleteTokenDto
      return this.redisClient.del(userId)
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
