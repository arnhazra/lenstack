import { Controller, Post, Body, Get } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscribeDto } from "./dto/subscribe.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/token-authorizer.decorator"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Get("activatehobby")
  async activateHobby(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.subscriptionService.activateHobby(uft.userId)
    }

    catch (error) {
      throw error
    }
  }

  @Post("subscribe")
  async subscribe(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() subscribeDto: SubscribeDto) {
    try {
      return this.subscriptionService.subscribe(uft.userId, subscribeDto)
    }

    catch (error) {
      throw error
    }
  }

  @Get("getsubscriptionconfig")
  getSubscriptionConfig() {
    try {
      return this.subscriptionService.getSubscriptionConfig()
    }

    catch (error) {
      throw error
    }
  }
}
