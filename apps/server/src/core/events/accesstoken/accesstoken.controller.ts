import { Controller } from '@nestjs/common'
import { AccesstokenService } from './accesstoken.service'
import { SetAccessTokenDto } from './dto/set-accesstoken.dto'
import { OnEvent } from "@nestjs/event-emitter"
import { GetAccessTokenDto } from "./dto/get-accesstoken.dto"
import { DeleteAccessTokenDto } from "./dto/delete-accesstoken.dto"
import { EventsUnion } from "../events.union"

@Controller('accesstoken')
export class AccesstokenController {
  constructor(private readonly accesstokenService: AccesstokenService) { }

  @OnEvent(EventsUnion.SetAccessToken)
  async setToken(setAccessTokenDto: SetAccessTokenDto) {
    return await this.accesstokenService.setToken(setAccessTokenDto)
  }

  @OnEvent(EventsUnion.GetAccessToken)
  async getToken(getAccessTokenDto: GetAccessTokenDto) {
    return await this.accesstokenService.getToken(getAccessTokenDto)
  }

  @OnEvent(EventsUnion.DeleteAccessToken)
  async deleteToken(deleteAccessTokenDto: DeleteAccessTokenDto) {
    return await this.accesstokenService.deleteToken(deleteAccessTokenDto)
  }
}
