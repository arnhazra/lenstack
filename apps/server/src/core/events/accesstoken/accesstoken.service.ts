import { BadRequestException, Injectable } from "@nestjs/common"
import { SetAccessTokenDto } from "./dto/set-accesstoken.dto"
import { GetAccessTokenDto } from "./dto/get-accesstoken.dto"
import { DeleteAccessTokenDto } from "./dto/delete-accesstoken.dto"
import setTokenCommand from "./commands/set-token.command"
import getTokenQuery from "./queries/get-token.query"
import deleteTokenCommand from "./commands/delete-token.command"

@Injectable()
export class AccesstokenService {
  async setToken(setAccessTokenDto: SetAccessTokenDto) {
    try {
      return await setTokenCommand(setAccessTokenDto.userId, setAccessTokenDto.accessToken)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async getToken(getAccessTokenDto: GetAccessTokenDto) {
    try {
      return await getTokenQuery(getAccessTokenDto.userId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  async deleteToken(deleteAccessTokenDto: DeleteAccessTokenDto) {
    try {
      return await deleteTokenCommand(deleteAccessTokenDto.userId)
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
