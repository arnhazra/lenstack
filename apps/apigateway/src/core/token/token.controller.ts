import { Controller } from "@nestjs/common"
import { TokenService } from "./token.service"
import { SetTokenDto } from "./dto/set-token.dto"
import { OnEvent } from "@nestjs/event-emitter"
import { GetTokenDto } from "./dto/get-token.dto"
import { DeleteTokenDto } from "./dto/delete-token.dto"
import { EventsUnion } from "../../shared/utils/events.union"

@Controller("token")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @OnEvent(EventsUnion.SetToken)
  async setToken(setTokenDto: SetTokenDto) {
    return await this.tokenService.setToken(setTokenDto)
  }

  @OnEvent(EventsUnion.GetToken)
  async getToken(getTokenDto: GetTokenDto) {
    return await this.tokenService.getToken(getTokenDto)
  }

  @OnEvent(EventsUnion.DeleteToken)
  async deleteToken(deleteTokenDto: DeleteTokenDto) {
    return await this.tokenService.deleteToken(deleteTokenDto)
  }
}
