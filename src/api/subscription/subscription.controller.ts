import { Controller, Post, Body } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { SubscribeDto } from "./dto/subscribe.dto"
import { TokenAuthorizer } from "src/authorization/tokenauthorizer/tokenauthorizer.decorator"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post("activatetrial")
  async activateTrial(@TokenAuthorizer() userId: string) {
    try {
      return this.subscriptionService.activateTrial(userId)
    }

    catch (error) {
      throw error
    }
  }

  @Post("subscribe")
  async subscribe(@TokenAuthorizer() userId: string, @Body() subscribeDto: SubscribeDto) {
    try {
      return this.subscriptionService.subscribe(userId, subscribeDto)
    }

    catch (error) {
      throw error
    }
  }

  @Post("getusagebyapikey")
  async getUsageByApiKey(@TokenAuthorizer() userId: string) {
    try {
      const usage = await this.subscriptionService.getUsageByApiKey(userId)
      return usage
    }

    catch (error) {
      throw error
    }
  }
}
