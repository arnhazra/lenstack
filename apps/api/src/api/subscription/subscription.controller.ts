import { Controller, Post, Body, Get, BadRequestException } from "@nestjs/common"
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

  @Post("gateway/alchemy")
  async alchemyTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.subscriptionService.alchemyTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/infura")
  async infuraTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.subscriptionService.infuraTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }

  @Post("gateway/quicknode")
  async quicknodeTransactionGateway(@Body() requestBody: any) {
    try {
      const response = await this.subscriptionService.quicknodeTransactionGateway(requestBody)
      return response
    }

    catch (error) {
      throw new BadRequestException()
    }
  }
}
