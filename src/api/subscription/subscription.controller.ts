import { Controller, Post, Body } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscribeDto } from "./dto/subscribe.dto"
import { TokenAuthorizer, TokenAuthorizerResponse } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post("activatetrial")
  async activateTrial(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.subscriptionService.activateTrial(uft.userId, uft.workspaceId)
    }

    catch (error) {
      throw error
    }
  }

  @Post("subscribe")
  async subscribe(@TokenAuthorizer() uft: TokenAuthorizerResponse, @Body() subscribeDto: SubscribeDto) {
    try {
      return this.subscriptionService.subscribe(uft.userId, uft.workspaceId, subscribeDto)
    }

    catch (error) {
      throw error
    }
  }

  @Post("getsubscriptionconfig")
  getSubscriptionConfig(@TokenAuthorizer() uft: TokenAuthorizerResponse) {
    try {
      return this.subscriptionService.getSubscriptionConfig()
    }

    catch (error) {
      throw error
    }
  }
}
