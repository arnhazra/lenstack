import { BadRequestException, Inject, Injectable } from "@nestjs/common"
import { SetAccessTokenDto } from "./dto/set-accesstoken.dto"
import { GetAccessTokenDto } from "./dto/get-accesstoken.dto"
import { DeleteAccessTokenDto } from "./dto/delete-accesstoken.dto"
import Redis from "ioredis"

@Injectable()
export class AccesstokenService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) { }

  async setToken(setAccessTokenDto: SetAccessTokenDto) {
    try {
      const { userId, accessToken } = setAccessTokenDto
      return await this.redisClient.set(userId, accessToken)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getToken(getAccessTokenDto: GetAccessTokenDto) {
    try {
      const { userId } = getAccessTokenDto
      return await this.redisClient.get(userId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async deleteToken(deleteAccessTokenDto: DeleteAccessTokenDto) {
    try {
      const { userId } = deleteAccessTokenDto
      return this.redisClient.del(userId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
