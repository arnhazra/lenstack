import { Controller, Post, Body, Get, Query, Res, UseGuards, Request } from "@nestjs/common"
import { SubscriptionService } from "./subscription.service"
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto"
import { envConfig } from "src/env.config"
import { otherConstants } from "src/utils/constants/other-constants"
import { TokenGuard } from "src/auth/token.guard"
import { ModRequest } from "src/auth/types/mod-request.interface"

@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Get("config")
  getSubscriptionConfig() {
    try {
      return this.subscriptionService.getSubscriptionConfig()
    }

    catch (error) {
      throw error
    }
  }

  @UseGuards(TokenGuard)
  @Post("checkout")
  async createCheckoutSession(@Request() request: ModRequest, @Body() createCheckoutSessionDto: CreateCheckoutSessionDto) {
    try {
      const session = await this.subscriptionService.createCheckoutSession(createCheckoutSessionDto.selectedPlan, request.user.userId)
      return { redirectUrl: session.url }
    }

    catch (error) {
      throw error
    }
  }

  @Get("subscribe")
  async handleSubscribe(@Query("session_id") sessionId: string, @Res() res: any) {
    if (!sessionId) {
      res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
    }

    else {
      try {
        await this.subscriptionService.subscribe(sessionId)
        res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
      }

      catch (error) {
        res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
      }
    }
  }

  @Get("cancel")
  handleCancel(@Res() res: any) {
    res.redirect(envConfig.nodeEnv === "development" ? otherConstants.stripeRedirectUriDev : otherConstants.stripeRedirectUriProd)
  }
}